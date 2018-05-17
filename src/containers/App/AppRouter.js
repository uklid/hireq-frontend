import React, { Component } from "react"
import { Route } from "react-router-dom"
import asyncComponent from "../../helpers/AsyncFunc"
import EditPosition from '../Position/EditPosition'

const routes = [
  {
    path: "",
    component: asyncComponent(() => import("../dashboard"))
  },
  {
    path: "blankPage",
    component: asyncComponent(() => import("../blankPage"))
  },
  {
    path: "create-position",
    component: asyncComponent(() => import("../Position/CreatePosition"))
  },
  {
    path: "create-position/create-setting",
    component: asyncComponent(() => import("../Position/SecondCreatePosition"))
  },
  {
    path: "edit-position",
    component: asyncComponent(() => import("../Position/EditPosition"))
  },
  {
    path: "position-detail",
    component: asyncComponent(() => import("../Position/PositionDetail"))
  },
  {
    path: "report",
    component: asyncComponent(() => import("../Report/Report"))
  }
]

class AppRouter extends Component {
  render() {
    const { url, style } = this.props
    return (
      <div style={style}>
        {routes.map(singleRoute => {
          const { path, exact, ...otherProps } = singleRoute
          return (
            <Route
              exact={exact === false ? false : true}
              key={singleRoute.path}
              path={`${url}/${singleRoute.path}`}
              {...otherProps}
            />
          )
        })}
      </div>
    )
  }
}

export default AppRouter
