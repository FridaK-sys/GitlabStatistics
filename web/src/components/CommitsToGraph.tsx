import { useContext, useEffect, useState } from "react";
import { Button, Dropdown, Menu, Space, MenuProps } from 'antd';
import { DownOutlined, UserOutlined } from '@ant-design/icons';
import { Container } from "react-bootstrap";
import { getAllCommitsFromApi, getAllBranches, getAllCommitsFromBranch } from "../api/apiservice";
import { Branch, Commit, commitsByDate } from "../api/types";
import Chart from "./Graph";
import { ThemeContext } from "../context/ThemeContext";
import { getFormValues } from "./utils";

/** 
* Function that returns dates between to given dates
*
* @param startDateStr 
* @param stopDateStr
* @returns The dates between the start and stop date
*/
function getDates(startDateStr: string, stopDateStr: string) {

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

export default function CommitsToGraph() {

    const [chartData, setChartData] = useState<commitsByDate[]>([]);
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

    /** 
    * Updates the data in ChartData
    *
    * @param commitList
    */
    function updateCommitData(commitList: Commit[]) {
        const firstCommitDate = commitList.slice(-1)[0].committed_date.slice(0, 10);
        const lastCommitDate = commitList[0].committed_date.slice(0, 10);

        let newChartsDataState: commitsByDate[] = getDates(
            firstCommitDate,
            lastCommitDate
        );

        for (let apiCommit of commitList) {
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
        setChartData(newChartsDataState);
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
        data: chartData,
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
                <div className="text">
                    <h4>Please enter a repository!</h4>
                    <p>In order to view information about a repository, you must type the project code and the token (if needed).</p>
                </div>
            }
        </Container>
    );
}