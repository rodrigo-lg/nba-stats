import dynamic from 'next/dynamic';

const Chart = dynamic(() => import('react-apexcharts'), { ssr: false });

interface GroupedBarChartProps {
    names: string[];
    series: [number[], number[]];
    categories: string[];
    colors: string[];
    title: string;
    max: number;
    height: number;
}

export default function OpposingBarsChart({
    names,
    series,
    categories,
    colors,
    title,
    max,
    height,
}: GroupedBarChartProps): JSX.Element {
    const graph = {
        series: [
            {
                name: names[0],
                data: series[0],
            },
            {
                name: names[1],
                data: series[1],
            },
        ],
        options: {
            chart: {
                type: 'bar',
                stacked: true,
                foreColor: '#fff',
                toolbar: {
                    show: false,
                },
            },
            colors,
            plotOptions: {
                bar: {
                    horizontal: true,
                    barHeight: '80%',
                },
            },
            dataLabels: {
                enabled: false,
            },
            stroke: {
                width: 1,
                colors: ['#fff'],
            },

            grid: {
                xaxis: {
                    lines: {
                        show: false,
                    },
                },
            },
            yaxis: {
                min: -max,
                max,
            },
            tooltip: {
                shared: false,
                x: {
                    formatter(val) {
                        return val;
                    },
                },
                y: {
                    formatter(val) {
                        return Math.abs(val);
                    },
                },
                theme: 'dark',
                items: {
                    display: 'flex',
                },
            },
            title: {
                text: title,
                align: 'center',
            },
            xaxis: {
                categories,
                labels: {
                    formatter(val) {
                        return Math.abs(val);
                    },
                },
            },
            legend: {
                labels: {
                    colors: ['#fff', '#fff'],
                    useSeriesColors: false,
                },
                horizontalAlign: 'left',
            },
        },
    };

    return (
        <Chart
            options={graph.options}
            series={graph.series}
            type="bar"
            height={height}
        />
    );
}
