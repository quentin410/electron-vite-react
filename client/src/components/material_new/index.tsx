import React, { useState, useContext } from 'react';
import { Button, Modal } from 'antd';
import FormRender, { useForm } from 'form-render';
import { schema } from './schema.json'
import { Context } from 'reducers'

const Component:React.FC = () => {
  const [state, dispatch] = useContext(Context)
  const form = useForm();
  const handleOk = () => form.submit()
  const handleCancel = () => dispatch({type: 'CHANGE_MATERIAL_NEW_MODAL', payload: false})
  return (
    <Modal visible={true} width={800} onOk={handleOk} onCancel={handleCancel}>
      <FormRender form={form} schema={schema} />
    </Modal>
  );
};

export default Component;