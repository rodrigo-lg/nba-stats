import dynamic from 'next/dynamic';

const Chart = dynamic(() => import('react-apexcharts'), { ssr: false });

interface PieChartProps {
    series: number[];
    title: string;
    labels: string[];
    colors: string[];
}

export default function PieChart({
    series,
    title,
    labels,
    colors,
}: PieChartProps): JSX.Element {
    const graph = {
        series,
        options: {
            colors,
            chart: {
                width: 380,
                type: 'pie',
                foreColor: '#fff',
            },
            title: {
                text: title,
            },
            labels,
            responsive: [
                {
                    breakpoint: 480,
                    options: {
                        chart: {
                            width: 320,
                        },
                        title: {
                            align: 'center',
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
            type="pie"
            width={380}
        />
    );
}
