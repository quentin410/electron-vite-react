import React, { useContext } from 'react'
import { Context } from 'reducers/index'
import './index.less'
import axios from 'axios'

export default () => {
  const [state, dispatch] = useContext(Context)
  const handleShowSettingModal = () => {
    dispatch({ type: 'CHANGE_SETTING_MODAL', payload: true })
  }
  return <div className='header-wrapper'>
    <div className='navbar-wrapper'>
      <div className="header-item">文件</div>
      <div className="header-item" onClick={handleShowSettingModal}>设置</div>
    </div>
  </div>
}