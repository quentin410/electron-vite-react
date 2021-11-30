import React, { useContext } from 'react';
import { Button, Card, notification, Avatar } from 'antd'
import axios from 'utils/axios'
import { EditOutlined, EllipsisOutlined, SettingOutlined, ArrowDownOutlined } from '@ant-design/icons';

import { Context } from 'reducers'
import './index.less'
const { Meta } = Card;
export default (props) => {
  const { data: { name, repository, screenshot, material_key, creator, creator_workid } } = props

  const [state, dispatch] = useContext(Context)
  const handleClickGitlab = (repository) => {
    window.open(repository)
  }
  const handleDebug = () => {
    dispatch({ type: 'CHANGE_DEBUG_MODAL', payload: true })
    dispatch({ type: 'UPDATE_DEBUG_MATERIAL_KEY', payload: material_key })
  }

  const handleDownload = async (data) => {
    const res = await axios.post(`materials/download`, { material_key, repository: data.repository, workspace: window.localStorage.getItem('workspace') })
    if (res.code === 0) {
      window.dbPromise.then(async (db) => {
        const localMaterial = {
          name: data.name,
          screenshot: data.screenshot,
          id: data.id,
          material_key: data.material_key,
          creator: data.creator,
          creator_workid: data.creator_workid,
        }
        try {
          await db.add('local-materials', localMaterial)
        } catch (err) {
        }
        const res = await db.getAll('local-materials')
        dispatch({ type: 'UPDATE_LOCAL_MATERIALS', payload: res })
        const args = {
          message: '下载成功',
          description: '请切换到本地物料进行调试',
          duration: 2,
        };
        notification.open(args);
      })
    } else {
      const args = {
        message: '下载失败',
        description: res.value,
        duration: 2,
      };
      notification.open(args);
    }

  }
  const handleVscode = () => {
    const materialPath = window.localStorage.getItem('workspace') + '/' + material_key;
    console.log(12333, materialPath)
    window?.api?.send('vscode', materialPath)
  }
  const handleVscode2 = () => {
    const materialPath = window.localStorage.getItem('workspace') + '/build';
    console.log(12333, materialPath)
    window?.api?.send('vscode', materialPath)
  }
  let actions = []
  if (props.isLocal) {
    actions = [
      <img onClick={handleDebug} className='debug-icon' src='https://gw.alicdn.com/imgextra/i3/O1CN01vGzwpp1aBmXyMAMd0_!!6000000003292-2-tps-200-200.png' />,
      <img onClick={handleVscode} className="editor-icon" src="https://img.alicdn.com/imgextra/i3/O1CN01vYVHPQ1hVCekKT8Ta_!!6000000004282-2-tps-200-200.png" />,
      <img onClick={handleVscode2} className="editor-icon" src="https://img.alicdn.com/imgextra/i3/O1CN01vYVHPQ1hVCekKT8Ta_!!6000000004282-2-tps-200-200.png" />,
    ];
  } else {
    actions = [
      <ArrowDownOutlined key="edit" onClick={handleDownload.bind(null, props.data)} />,
      <SettingOutlined key="setting" />,
      <EllipsisOutlined key="ellipsis" />
    ];
  }
  return <Card
    style={{ width: 300 }}
    className="material-card-box"
    cover={
      <img
        alt="example"
        src={screenshot || 'http://gw.alicdn.com/tfs/TB17i4.LNTpK1RjSZFMXXbG_VXa-128-128.png'}
        className="cover-img"
      />
    }
    actions={actions}
  >
    <Meta
      // avatar={<Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />}
      title={name}
      description={material_key}
    />
    <div className="creator">开发：{creator}({creator_workid})</div>
  </Card>
}