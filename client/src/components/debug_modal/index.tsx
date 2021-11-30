import React, { useState, useContext, useEffect } from 'react';
import { Spin, Modal, Select, Form, Input } from 'antd';
import axios from 'utils/axios'
import { Context } from 'reducers'
import JSONEditor from 'jsoneditor'
import 'jsoneditor/dist/jsoneditor.min.css'
import debounce from 'lodash/debounce';
import './index.less'

const layout = {
  labelCol: { span: 2 },
  wrapperCol: { span: 22 },
};
const { Option } = Select;
const tailLayout = {
  wrapperCol: { offset: 2, span: 22 },
};
const Component: React.FC = () => {
  const lastDebugObj = window.localStorage.getItem('lastDebugObj')
  const pi = lastDebugObj ? JSON.parse(lastDebugObj).pi : ''
  const modules = lastDebugObj ? JSON.parse(lastDebugObj).modules : []
  const defaultPageId = lastDebugObj ? JSON.parse(lastDebugObj).pageId : ''
  const selectedAppIdDefaultValue = lastDebugObj ? JSON.parse(lastDebugObj).selectedAppId : null
  const [selectedAppId, setSelectedAppId] = useState(selectedAppIdDefaultValue)
  const [pageId, setPageId] = useState(defaultPageId)
  const [state, dispatch] = useContext(Context)
  const [fetching, setFetching] = useState(false)
  const [piOptions, setPIOptions] = useState([])
  const [applications, setApplications] = useState([])
  const [pages, setPages] = useState([])
  const [moduleOptions, setModuleOptions] = useState([])
  const [editor, setEditor] = useState(null)
  const [form] = Form.useForm()
  const handleOk = () => {
    form.submit();
  }
  const handleCancel = () => dispatch({ type: 'CHANGE_DEBUG_MODAL', payload: false })
  const handleFinish = (values) => {
    const templateJson = {
      container: {
        npm: `@ali/${values.pi}`,
        version: 'latest',
        initialParams: JSON.parse(pages.find(v => v.id === values.pageId).initial_params)
      },
      components: values.modules && values.modules.map(v => {
        return {
          npm: `@ali/${v}`,
          version: 'latest',
          debug: false
        }
      }).concat({
        npm: `@ali/${state.debugMaterialKey}`,
        version: 'latest',
        debug: true
      })
    }
    dispatch({
      type: "CHANGE_COMPILE_STATUS",
      payload: {
        compileText: "开始构建",
        compilePercent: 0,
      }
    })
    templateJson.workspace = window.localStorage.getItem("workspace")
    console.log(11111111111, JSON.stringify(templateJson.container.initialParams))
    window?.api?.send('start-debug', { templateJson })
    handleCancel()
  }
  useEffect(() => {
    const container = document.getElementById('jsoneditor');
    const options = {
      mode: 'code'
    };
    if (container && !editor) {
      const editor = new JSONEditor(container, options);
      setEditor(editor)
    }
    axios.get('applications?type=0').then(res => {
      setApplications(res.value)
    })
    axios.get('materials?type=0').then(res => {
      const options = res.value.map((item) => {
        return {
          label: item.name,
          value: item.material_key
        }
      })
      setPIOptions(options)
    })
    axios.get('materials?type=1').then(res => {
      const options = res.value.map((item) => {
        return {
          label: item.name,
          value: item.material_key
        }
      })
      setModuleOptions(options)
    })
    if (selectedAppId) {
      axios.get(`pages?applicationId=${selectedAppId}`).then(res => {
        setPages(res.value)
      })
    }
  }, [])
  const fetchRef = React.useRef(0);
  const debounceSearchPIs = React.useMemo(() => {
    const loadOptions = (keyword: string) => {
      if (!keyword) return
      fetchRef.current += 1;
      const fetchId = fetchRef.current;
      setFetching(true);
      keyword && axios.get("materials", { params: { keyword, type: 0 } }).then((res) => {
        if (fetchId !== fetchRef.current) return;
        setFetching(false);
        const options = res.map((item) => {
          return {
            label: item.name,
            value: item.material_key
          }
        })
        setPIOptions(options)
      });
    };
    return debounce(loadOptions, 800);
  }, []);
  const debounceSearchModules = React.useMemo(() => {
    const loadOptions = (keyword: string) => {
      if (!keyword) return
      fetchRef.current += 1;
      const fetchId = fetchRef.current;
      setFetching(true);
      keyword && axios.get("materials", { params: { keyword, type: 1 } }).then((res) => {
        if (fetchId !== fetchRef.current) return;
        setFetching(false);
        const options = res.value.map((item) => {
          return {
            label: item.name,
            value: item.material_key
          }
        })
        setModuleOptions(options)
      });
    };
    return debounce(loadOptions, 800);
  }, []);
  const handleSelectApplication = async (id) => {
    const res = await axios.get(`pages?applicationId=${id}`)
    setPages(res.value)
    setSelectedAppId(id)
    const obj = lastDebugObj ? JSON.stringify({ ...JSON.parse(lastDebugObj), selectedAppId: id }) : JSON.stringify({ selectedAppId: id })
    window.localStorage.setItem("lastDebugObj", obj)
    setPageId('')
  }
  const onFieldsChange = (values) => {
    const lastDebugObj = window.localStorage.getItem('lastDebugObj')
    console.log(5555555, values, lastDebugObj)
    if (lastDebugObj) {
      const preValue = JSON.parse(lastDebugObj)
      const key = values[0].name[0]
      const v = values[0].value
      preValue[key] = v
      window.localStorage.setItem('lastDebugObj', JSON.stringify(preValue))
    } else {
      const o = {};
      const key = values[0].name[0]
      const v = values[0].value
      o[key] = v
      window.localStorage.setItem('lastDebugObj', JSON.stringify(o))
    }
  }
  console.log(11111, pi)
  return <Modal className='debug-modal-wrapper' visible={state.debugModalVisible} width={800} onOk={handleOk} onCancel={handleCancel}>
    <Form {...layout} onFinish={handleFinish} onFieldsChange={onFieldsChange} form={form} initialValues={{ pi, modules, pageId }}>
      <Form.Item {...tailLayout} label="PI" name="pi">
        <Select placeholder="请选择PI" filterOption={false} options={piOptions} loading={fetching} showSearch onSearch={debounceSearchPIs} notFoundContent={fetching ? <Spin size="small" /> : null}></Select>
      </Form.Item>
      {/* <Form.Item {...tailLayout} label="mock数据" name="data">
        <Input.TextArea style={{ height: '100px' }} />
            <div id="jsoneditor" style={{ width: '400px', height: '240px' }}></div>
      </Form.Item> */}
      <div className='select-page-wrapper'>
        <div className="page-label">页面数据：</div>
        <Select
          showSearch
          placeholder="请选择应用"
          optionFilterProp="children"
          style={{ width: 220 }}
          onChange={handleSelectApplication}
          value={selectedAppId}
        >
          {applications.map(v => <Option key={v.id} value={v.id}>{v.name}</Option>)}
        </Select>
        <div style={{ visibility: pages.length > 0 ? 'visible' : 'hidden' }}>
          <Form.Item
            {...tailLayout}
            name="pageId"
            label=""
            rules={[
              { required: true, message: '请填写页面默认参数' }
            ]}
          >
            <Select
              showSearch
              placeholder="请选择页面"
              optionFilterProp="children"
              style={{ width: 220 }}
            >
              {pages.map(v => <Option key={v.id} value={v.id}>{v.name}</Option>)}
            </Select>
          </Form.Item>
        </div>
      </div>
      <Form.Item {...tailLayout} label="模块" name="modules">
        <Select placeholder="请选择模块" options={moduleOptions} filterOption={false} showSearch onSearch={debounceSearchModules} mode="multiple" notFoundContent={fetching ? <Spin size="small" /> : null}></Select>
      </Form.Item>
    </Form>
  </Modal>
}

export default Component