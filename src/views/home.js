import styled from 'styled-components';
import { truncate } from '../style-utils';
import React, { Component } from 'react';
import Avatar from 'material-ui/Avatar';
import CircularProgress from 'material-ui/CircularProgress';
import Divider from 'material-ui/Divider';
import {List, ListItem} from 'material-ui/List';
import {Tabs, Tab} from 'material-ui/Tabs';

const CircularProgressBox = styled.div`
  text-align: center;
  padding: 20px;
`
const Flex = styled.div`
  display: flex;
`
const FlexItem = styled.div`
  flex: 1;
  padding-left: 16px;
  font-size: 14px;
  width: calc(100% - 150px);
`
const PrimaryText = styled.div`
  ${ truncate('100%') }
`
const MutedText = styled.div`
  color: rgba(0,0,0,.54);
`
const TimeagoBox = styled.div` 
  color: rgba(0,0,0,.54);
  font-size: 14px;
  width: 62px;
`

class Home extends Component {
  render() {
    return (
      <div>
        <Tabs>
          <Tab label="全部" >
          </Tab>
          <Tab label="精华" >
          </Tab>
          <Tab label="分享" >
          </Tab>
        </Tabs>
        <List>
        <ListItem
          children={
            <Flex>
              <Avatar src="https://avatars3.githubusercontent.com/u/4279697?v=3&s=120" />
              <FlexItem>
                <PrimaryText>【北京】石墨招 Node.js 工程师啦~（可远程）</PrimaryText>
                <MutedText>9/497</MutedText>
              </FlexItem>
              <TimeagoBox>16小时前</TimeagoBox>
            </Flex>
          }
        />
        <Divider />
        <CircularProgressBox>
          <CircularProgress/>
        </CircularProgressBox>
      </List>
      </div>
    );
  }
}

export default Home;