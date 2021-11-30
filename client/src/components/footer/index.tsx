import React, { useState, useEffect, useContext } from 'react';
import { Context } from 'reducers'
import { Progress, Button } from 'antd'
import './index.less'

export default () => {
  const [state, dispatch] = useContext(Context)

  useEffect(() => {
    setTimeout(() => {
      dispatch({
        type: "CHANGE_COMPILE_STATUS",
        payload: {
          compileText: "",
          compilePercent: undefined
        }
      })
    }, 1000)
  }, [state.compilePercent === 100])
  return <div className='footer-wrapper'>
    <div className='left'></div>
    <div className='right' >
      {state.compilePercent >= 0 && <div className="compile-status-box">
        <Progress percent={state.compilePercent} size="small" />
      </div>}
      <div className='progress-text'>{state.compileText}</div>
      {/* <Button onClick={handleClick} size="small" type="primary" style={{marginRight: '20px'}}>vscode打开</Button>
      <Button size="small">复制地址</Button> */}
    </div>

  </div>
}