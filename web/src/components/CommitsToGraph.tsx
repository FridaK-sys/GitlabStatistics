import { useContext, useEffect, useState } from "react";
import { Button, Dropdown, Menu, Space, MenuProps } from 'antd';
import { DownOutlined, UserOutlined } from '@ant-design/icons';
import { Container } from "react-bootstrap";
import { getAllCommitsFromApi, getAllBranches, getAllCommitsFromBranch } from "../api/apiservice";
import { Branch, Commit, commitsByDate } from "../api/types";
import Chart from "./Graph";
import { ThemeContext } from "../context/ThemeContext";

function getDates(startDateStr: string, stopDateStr: string) { //hei
    let currentDate = new Date(startDateStr);
    const stopDate = new Date(stopDateStr);
    let allDates: commitsByDate[] = [];
    
    while (currentDate <= stopDate) {
        let date: commitsByDate = {
            date: currentDate.toISOString().slice(0, 10),
            commits: 0,
        };
        allDates.push(date);
        currentDate.setDate(currentDate.getDate() + 1);
    }
    return allDates;
}

function getFormValues() {
    const storedValues = localStorage.getItem('form');
    if (!storedValues)
        return {
          repo: '',
          token: '',
        };
    return JSON.parse(storedValues);
}

export default function CommitsToGraph() {

    const [chartsData, setChartsData] = useState<commitsByDate[]>([]);
    const [branches, setBranches] = useState<Branch[]>([])
    const [currentBranch, setCurrentBranch] = useState<String>("")
    const { theme } = useContext(ThemeContext);

    const handleFilterClick: MenuProps['onClick'] = e => {
        if (getFormValues().repo === '') {
            return
        }
        setCurrentBranch(e.key)
        getAllCommitsFromBranch(e.key).then((res) => {
            if (!res.ok) return console.error(res.status, res.data);
            updateCommitData(res.data);
        });     
    };

    const menu = (
        <Menu>
            {branches.map((m) => (
            <Menu.Item key={m.name} onClick={handleFilterClick} icon={<UserOutlined />}>
                {m.name}
            </Menu.Item>
            ))}
       </Menu>
    );
    
    function updateCommitData(commitsList: Commit[]) {
        const firstCommitDate = commitsList.slice(-1)[0].committed_date.slice(0, 10);
        const lastCommitDate = commitsList[0].committed_date.slice(0, 10);

        let newChartsDataState: commitsByDate[] = getDates(
            firstCommitDate,
            lastCommitDate
        );

        for (let apiCommit of commitsList) {
            const date = apiCommit.committed_date.slice(0, 10);
            console.log(date)
            newChartsDataState = newChartsDataState.map((chartDataObject) => {
                if (chartDataObject.date === date) {
                return {
                    ...chartDataObject,
                    commits: chartDataObject.commits + 1,
                };
            }
            return chartDataObject;
        });
        }
        setChartsData(newChartsDataState);
    }

    useEffect(() => {
        if (getFormValues().repo === '') {
            return
        }
        const fetchCommits = async () => {
          try {
            const commits = await getAllCommitsFromApi();
            updateCommitData(commits);
            setCurrentBranch("main")
            
          } catch (e) {
            console.log(e);
          }
        };
        fetchCommits();
    }, []);    

    useEffect(() => {
        if (getFormValues().repo === '') {
            return
        }
        getAllBranches().then((res) => {
            if (!res.ok) return console.error(res.status, res.data);
            setBranches(res.data);
        });   
    }, []);    

    const props = {
        data: chartsData,
    };

    return (
        <Container>
            {!(getFormValues().repo === '') &&
                <>
                    <h3 className="pt-4 pb-4 text-center">Chosen branch: {currentBranch}</h3>
                    <Dropdown overlay={menu}>
                        <Button
                        style={{
                            backgroundColor: theme === "dark"? '#212529' : '#f5f5f5' , 
                            color: theme === "dark"? '#f8f9fa' : '000000'
                        }}>
                            <Space> 
                                Branch: {currentBranch}
                            <DownOutlined />
                            </Space>
                        </Button>
                    </Dropdown>
                    <Chart {...props} />
                </>
            }
            {(getFormValues().repo === '') &&
                <h4 className="text">Please enter a repo!</h4>
            }
        </Container>
    );
}