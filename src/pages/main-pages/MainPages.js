import React, {Component} from 'react';
import HeaderComponent from "../../component/HeaderComponent";
import Home from "../home/Home";
import {Route, Switch,withRouter} from "react-router-dom";
import NotFound from "../../component/NotFoundComponent";
import MenuContainer from "../user/UserContainer";

const routes = [
    {id: 1, path: '/', component: Home},
    {id: 2, path: '/user', component: MenuContainer},
];

class MainPages extends Component {

    render() {

        const routeList = routes.map((route) => {
            return <Route
                exact
                key={route.id}
                path={route.path} render={
                (props) => {
                    return <route.component {...props}/>
                }
            }/>
        });

        return (
            <div>
                <HeaderComponent logout={()=>this.onLogout()}/>
                <Switch>
                    {routeList}
                    <Route path="*">
                        <NotFound/>
                    </Route>
                </Switch>
            </div>
        );
    }
}

export default withRouter(MainPages);