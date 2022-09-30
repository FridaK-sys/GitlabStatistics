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
    const [currentFilter, setCurrentFilter] = useState("")

    useEffect(() => {
        if (sessionStorage.getItem("status") === null || sessionStorage.getItem("status") === "3") {
            getIssuesFromAPI().then((res) => {
                if (!res.ok) return console.error(res.status, res.data);
                setFilteredIssues(res.data);
<<<<<<< HEAD
          });
        } else if (sessionStorage.getItem("status")=="1") {
            filterClosedIssues();
        } else {
            filterOpenIssues();
=======
                setCurrentFilter("All")
          });
        } else if (sessionStorage.getItem("status") === "1") {
            filterClosedIssues();
            setCurrentFilter("Closed")
        } else {
            filterOpenIssues();
            setCurrentFilter("Not closed")
>>>>>>> 6d5500957985449e61954a6e8d481d7f0669a0a4
        }
    }, []);

    const handleStatusClick: MenuProps['onClick'] = e => {
<<<<<<< HEAD
        if (e.key == "3") {
=======
        if (e.key === "3") {
>>>>>>> 6d5500957985449e61954a6e8d481d7f0669a0a4
            getIssuesFromAPI().then((res) => {
                if (!res.ok) return console.error(res.status, res.data);
                setFilteredIssues(res.data);
              });
        } else if (e.key == "1") {
            filterClosedIssues();
        } else {
            filterOpenIssues();
        }
        sessionStorage.setItem("status", e.key);
<<<<<<< HEAD
      };
=======
    };
>>>>>>> 6d5500957985449e61954a6e8d481d7f0669a0a4

    function filterClosedIssues() {
        getIssuesFromAPI().then((res) => {
            if (!res.ok) return console.error(res.status, res.data);
            setFilteredIssues(res.data.filter(el => /\d/.test(el.closed_at || '')));
        });
        setCurrentFilter("Closed")
    }

    function filterOpenIssues() {
        getIssuesFromAPI().then((res) => {
            if (!res.ok) return console.error(res.status, res.data);
            setFilteredIssues(res.data.filter(el => !/\d/.test(el.closed_at || '')));
        });
        setCurrentFilter("Not closed")
    }

    const statusMenu = (
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
            <Dropdown overlay={statusMenu}>
                <Button>
                    <Space>
<<<<<<< HEAD
                        Status
=======
                        {currentFilter}
>>>>>>> 6d5500957985449e61954a6e8d481d7f0669a0a4
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