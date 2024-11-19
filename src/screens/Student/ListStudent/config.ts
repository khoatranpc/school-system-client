import Highcharts from 'highcharts';
const chartOptions: Highcharts.Options = {
    title: {
        text: ''
    },
    chart: {
        backgroundColor: 'transparent',
        width: 100,
        height: 50
    },
    legend: {
        enabled: false
    },
    xAxis: {
        title: {
            text: ''
        },
        lineColor: 'rgba(255, 255, 255, 0.0)',
        labels: {
            enabled: false
        },
        visible: false
    },
    yAxis: {
        title: {
            text: ''
        },
        lineColor: 'var(--base)',
        labels: {
            enabled: false
        },
        visible: false
    },
    tooltip: {
        enabled: false
    },
    series: [
        {
            type: "line",
            data: [
                10, 20, 30, 40, 50, 60, 50, 30, 40, 50, 51
            ],
            color: 'var(--base)',
            marker: {
                enabled: false
            }
        }
    ],
}

const queryListStudent = `#graphql
    query Students($payload: StudentsInput) {
        students(payload: $payload){
            data{
                _id
                code
                isActive
                isDeleted
                userId {
                    _id
                    name
                    email
                    phoneNumber
                }
            }
                page
                limit
                totalPage
                count
        }
    }`;
export {
    chartOptions,
    queryListStudent
}