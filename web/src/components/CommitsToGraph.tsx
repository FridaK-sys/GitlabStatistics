import { useEffect, useState } from "react";
import { Container } from "react-bootstrap";
import { getAllCommitsFromApi } from "../api/apiservice";
import { Commit, commitsByDate } from "../api/types";
import Chart from "./Graph";

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

    const [chartsData, setChartsData] = useState<commitsByDate[]>([]);
    
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
        const fetchCommits = async () => {
          try {
            const commits = await getAllCommitsFromApi();
            updateCommitData(commits);
          } catch (e) {
            console.log(e);
          }
        };
        fetchCommits();
      }, []);    

    const props = {
        data: chartsData,
    };

    return (
        <Container>
            <div className="mt-2 mb-4">
                <h2>Commits chart</h2>
                <p>The graph below shows commits per day over the period chosen 
                    on the slider under the graph. 10th of september was the day 
                    of the first commits, and the end date on the graph is the 
                    date of the latest commit to the repository.</p>
            </div>
            <div>
                <Chart {...props} />
            </div>
        </Container>
    );
}