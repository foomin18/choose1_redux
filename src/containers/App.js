import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import CardList from '../components/CardList';
import SearchBox from '../components/SearchBox';
// import { robots } from './robots'; //複数のexportは{}でデストラクトする
import Scroll from '../components/Scroll';
import ErrorBoundry from '../components/ErrorBoundry';
import './App.css';

import { setSearchField, requestRobots } from '../actions';

const mapStateToProps = state => {
    return {
        searchField: state.searchRobots.searchField,  //storeにあるstateのsearchRobotsのsearchFieldを参照
        robots: state.requestRobots.robots,
        isPending: state.requestRobots.isPending,
        error: state.requestRobots.error
    }
};

const mapDispatchToProps = dispatch => {
    return {
        onSearchChange: (event) => dispatch(setSearchField(event.target.value)),
        //dispatch()の引数にactionを渡すことで、reducerからstateの変更を行うことが可能になります。
        //dispatch actions to reducer///////
        //この場合actionは、actionそのものではなく、actionを発行するsetSearchFieldを渡します。
        onRequestRobots: () => dispatch(requestRobots())
        //requestRobots actionが返す関数はdispatchを受け取り、action内で複数回objectをreducerにdispatchする
        //redux-thunkによってrequestRobots actionが返す関数の引数にdispatchが渡される
    }
}

const App = ({
    searchField,
    robots,
    isPending,
    onSearchChange,
    onRequestRobots
}) => { //smartcomponentの場合はAppclass内でthis.propsでデストラクタして使う

    useEffect(() => {
        onRequestRobots();
    }, []) //componentDidMountと同じ

    const filteredRobots = robots.filter(robot => { 
        return robot.name.toLowerCase().includes(searchField.toLowerCase()); //配列内で条件に合う要素の配列を返す
    })

    if (isPending) { //fetchに時間がかかってるとき
        return (<h1 className='tc'>Now on loading...</h1>);
    } else {
        return (
            <div className='tc'>
                <h1 className='f2'>ROBOFRIENDS</h1>
                <SearchBox searchChange={onSearchChange} />
                <Scroll> {/*他のcomponentをwrapするcomponent props.childrenとしてwrapしてるcomponentを持つ */}
                    <ErrorBoundry>
                        <CardList robots={filteredRobots} /> {/* CardListarrow関数にrobotsで渡してる*/}
                    </ErrorBoundry>
                </Scroll>
            </div>
        );
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(App); 
//connect()は関数を返すからconnect()(App)という書き方になる
