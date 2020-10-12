import dynamic from 'next/dynamic';

const Chart = dynamic(() => import('react-apexcharts'), { ssr: false });

interface GroupedBarChartProps {
    series1: number[];
    series2: number[];
    categories: string[];
    colors: string[];
}

export default function GroupedBarChart({
    series1,
    series2,
    categories,
    colors,
}: GroupedBarChartProps): JSX.Element {
    const graph = {
        series: [
            {
                name: 'Made',
                data: series1,
            },
            {
                name: 'Attempted',
                data: series2,
            },
        ],
        options: {
            colors,
            chart: {
                type: 'bar',
                height: 430,
                foreColor: '#fff',
            },
            plotOptions: {
                bar: {
                    horizontal: true,
                    dataLabels: {
                        position: 'top',
                    },
                },
            },
            dataLabels: {
                enabled: true,
                offsetX: -6,
                style: {
                    fontSize: '12px',
                    colors: ['#fff'],
                },
            },
            stroke: {
                show: true,
                width: 1,
                colors: ['#fff'],
            },
            xaxis: {
                categories,
            },
            tooltip: {
                theme: 'dark',
            },
            responsive: [
                {
                    breakpoint: 800,
                    options: {
                        plotOptions: {
                            bar: {
                                horizontal: false,
                            },
                        },
                        legend: {
                            position: 'bottom',
                        },
                    },
                },
            ],
        },
    };

    return (
        <Chart
            options={graph.options}
            series={graph.series}
            type="bar"
            height={430}
        />
    );
}
