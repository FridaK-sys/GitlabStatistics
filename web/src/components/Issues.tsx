import { Button, Dropdown, Menu, Space, Tooltip, message } from 'antd';
import { DownOutlined, UserOutlined } from '@ant-design/icons';
import React, { useEffect, useState } from "react";

import Card from 'react-bootstrap/Card';
import Container from 'react-bootstrap/Container';
import { Issue } from "../api/types";
import type { MenuProps } from 'antd';
import { formatDateAndTime } from "./utils";
import { getIssuesFromAPI } from '../api/apiservice';

export default function Issues() {

    const [filteredIssues, setFilteredIssues] = useState<Issue[] | null>(null);

    useEffect(() => {
        getIssuesFromAPI().then((res) => {
            if (!res.ok) return console.error(res.status, res.data);
            setFilteredIssues(res.data);
          });
    }, []);

    const handleFilterClick: MenuProps['onClick'] = e => {
        if (e.key == "3") {
            getIssuesFromAPI().then((res) => {
                if (!res.ok) return console.error(res.status, res.data);
                setFilteredIssues(res.data);
              });
        } else if (e.key == "1") {
            filterClosedIssues();
        } else {
            filterOpenIssues();
        }
      };

    function filterClosedIssues() {
        getIssuesFromAPI().then((res) => {
            if (!res.ok) return console.error(res.status, res.data);
            setFilteredIssues(res.data.filter(el => /\d/.test(el.closed_at || '')));
          });
    }

    function filterOpenIssues() {
        getIssuesFromAPI().then((res) => {
            if (!res.ok) return console.error(res.status, res.data);
            setFilteredIssues(res.data.filter(el => !/\d/.test(el.closed_at || '')));
          });
    }

    const menu = (
    <Menu
        onClick={handleFilterClick}
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
    
    filteredIssues?.forEach(el => {
        body.push(
            <div className="pb-4">
                <Card className="me-2">
                    <Card.Header>Id: {el.id}</Card.Header>
                    <Card.Body>
                        <Card.Title>Title: {el.title}</Card.Title>
                        <Card.Text>
                            <p>Author: {el.author.name}</p>
                            <p>Created_at: {formatDateAndTime(el.created_at)}</p>
                            <p className="pb-2">Labels: 
                                {el.labels.map((el) => (
                                    <li>{el}</li>
                                ))}
                            </p>
                            <p>Closed_at: {(el.closed_at ? formatDateAndTime(el.closed_at) : "Not closed")}</p>
                            <p>Milestone: {el.milestone.title}</p>
                        </Card.Text>
                    </Card.Body>
                </Card>
            </div>
        )     
    })

    return (
        <Container>                
            <div>
            <Dropdown overlay={menu}>
                <Button>
                    <Space>
                        Filter
                    <DownOutlined />
                    </Space>
                </Button>
            </Dropdown>
                <h3 className="pt-4 pb-4 text-center">Alle issues i prosjektet</h3>
                <div className="d-flex flex-wrap justify-content-center">
                    {body}
                </div>
            </div>
        </Container>
    );
}