import { Button, Dropdown, Menu, Space } from 'antd';
import { DownOutlined, UserOutlined } from '@ant-design/icons';
import { useEffect, useState } from "react";
import { Card, Col, Row } from 'antd';

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
              <Col xs={24} xl={6} className="mb-4">
                <Card title={el.id}>
                    <p>Author: {el.author.name}</p>
                    <p>Created_at: {formatDateAndTime(el.created_at)}</p>
                    <p>Labels: 
                    {el.labels.map((el) => (
                        <li>{el}</li>
                    ))}
                    </p>
                    <p>Closed_at: {(el.closed_at ? formatDateAndTime(el.closed_at) : "Not closed")}</p>
                    <p>Milestone: {el.milestone.title}</p>
                </Card>
              </Col>
        )     
    })

    return (
        <Container>                
            <Dropdown className="mb-4" overlay={menu}>
                <Button>
                    <Space>
                        Filter
                    <DownOutlined />
                    </Space>
                </Button>
            </Dropdown>
            <div className="site-card-wrapper">
                <Row gutter={16}>
                    {body}
                </Row>
            </div>
        </Container>
    );
}
