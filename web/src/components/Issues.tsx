import { Button, Dropdown, Menu, Space } from 'antd';
import { DownOutlined, UserOutlined } from '@ant-design/icons';
import { useContext, useEffect, useState } from "react";
import { Card, Col, Row } from 'antd';
import Container from 'react-bootstrap/Container';
import { Issue } from "../api/types";
import type { MenuProps } from 'antd';
import { formatDateAndTime, getFormValues } from "./utils";
import { getIssuesFromAPI } from '../api/apiservice';
import { ThemeContext } from "../context/ThemeContext";
import './Homepage.css';

export default function Issues() {

    const [filteredIssues, setFilteredIssues] = useState<Issue[] | null>(null);
    const [currentFilter, setCurrentFilter] = useState("")
    const { theme } = useContext(ThemeContext);

    useEffect(() => {
        if (getFormValues().repo === '') {
            return
        }
        if (sessionStorage.getItem("status") === null || sessionStorage.getItem("status") === "3") {
            getIssuesFromAPI().then((res) => {
                if (!res.ok) return console.error(res.status, res.data);
                setFilteredIssues(res.data);
                setCurrentFilter("All")
          });
        } else if (sessionStorage.getItem("status")==="1") {
            filterClosedIssues();
            setCurrentFilter("Closed")
        } else {
            filterOpenIssues();
            setCurrentFilter("Not closed")
        }
    }, []);

    const handleStatusClick: MenuProps['onClick'] = e => {
        if (getFormValues().repo === '') {
            return
        }
        if (e.key === "3") {
            getIssuesFromAPI().then((res) => {
                if (!res.ok) return console.error(res.status, res.data);
                setFilteredIssues(res.data);
              });
        } else if (e.key === "1") {
            filterClosedIssues();
        } else {
            filterOpenIssues();
        }
        sessionStorage.setItem("status", e.key);
    };
    
    /** 
    * Function that filter issues that are closed
    */ 

    function filterClosedIssues() {
        if (getFormValues().repo === '') {
            return
        }
        getIssuesFromAPI().then((res) => {
            if (!res.ok) return console.error(res.status, res.data);
            setFilteredIssues(res.data.filter(el => /\d/.test(el.closed_at || '')));
        });
        setCurrentFilter("Closed")
    }
    /** 
    * Function that filter issues that are not closed  
    */ 
    function filterOpenIssues() {
        if (getFormValues().repo === '') {
            return
        }
        getIssuesFromAPI().then((res) => {
            if (!res.ok) return console.error(res.status, res.data);
            setFilteredIssues(res.data.filter(el => !/\d/.test(el.closed_at || '')));
        });
        setCurrentFilter("Not closed")
    }

    const menu = (
        <Menu
            onClick={handleStatusClick}
            items={[
            {
                label: 'Closed',
                key: '1',
                icon: <UserOutlined />,
            },
            {
                label: 'Not closed',
                key: '2',
                icon: <UserOutlined />,
            },
            {
                label: 'All',
                key: '3',
                icon: <UserOutlined />,
                }
            ]}
        />
    );
    
    let body: any = []

    if (!(getFormValues().repo === '')) {
        filteredIssues?.forEach(el => {
            body.push(
                  <Col xs={24} md={8} xl={6} className="mb-4">
                    <Card title={el.id}
                        headStyle={{
                            backgroundColor: theme === "dark"? '#212529' : '#f5f5f5' , 
                            color: theme === "dark"? '#f8f9fa' : '000000'
                        }}
                        bodyStyle={{ 
                            backgroundColor: theme === "dark"? '#343a40' : '#fafafa',
                            color: theme === "dark"? '#f8f9fa' : '#000000'
                        }}>
                        <p>Author: {el.author.name ? el.author.name : "Not provided"}</p>
                        <p>Created_at: {el.created_at? formatDateAndTime(el.created_at) : "Not provided"}</p>
                        <p>Labels: 
                        {el.labels? el.labels.map((el) => (
                            <li>{el}</li>
                        )) : "Not provided"}
                        </p>
                        <p>Closed_at: {(el.closed_at ? formatDateAndTime(el.closed_at) : "Not closed")}</p>
                        <p>Milestone: {el.milestone? el.milestone.title : "Not provided"}</p>
                    </Card>
                  </Col>
            )     
        })
    }

    return (
        <Container>
             {!(getFormValues().repo === '') &&
                <>
                    <Dropdown className="mb-4" overlay={menu}>
                        <Button
                        style={{
                            backgroundColor: theme === "dark"? '#212529' : '#f5f5f5' , 
                            color: theme === "dark"? '#f8f9fa' : '000000'
                        }}>
                            <Space>
                                {currentFilter}
                            <DownOutlined />
                            </Space>
                        </Button>
                    </Dropdown>
                    <div className="site-card-wrapper">
                        <Row gutter={16}>
                            {body}
                        </Row>
                    </div>
                </>
            }
            {(getFormValues().repo === '') &&   
                <div className="text">
                    <h4>Please enter a repository!</h4>
                    <p>In order to view information about a repository, you must type the project code and the token (if needed).</p>
                </div>
            }             
        </Container>
    );
}
