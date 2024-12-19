import { Venture, metricDefinitions, MetricGroup, VentureMetrics } from "@/lib/types/venture";
import { ScatterChart, Scatter, XAxis, YAxis, ZAxis, Tooltip, ResponsiveContainer } from 'recharts';

interface VentureScatterPlotProps {
  ventures: Venture[];
  className?: string;
}

export function VentureScatterPlot({ ventures, className }: VentureScatterPlotProps) {
    console.log("VentureScatterPlot ventures passed in ==>", ventures);

    const calculateGroupScore = (venture: Venture, group: MetricGroup): number => {
        // Get metrics that belong to this group
        const groupMetrics = Object.entries(metricDefinitions)
            .filter(([_, metricDef]) => metricDef.group === group)
            .map(([key]) => key as keyof VentureMetrics);

        // Calculate average score for the group
        const scores = groupMetrics.map(metric => venture.metrics[metric]);
        const average = scores.reduce((sum, score) => sum + score, 0) / scores.length;
        
        // Convert to percentage (assuming metrics are 0-10 scale)
        return Math.round(average * 10);
    };

    const scatterData = ventures.map(venture => {
        console.log("Processing venture:", venture);
        return {
            name: venture.title,
            viability: calculateGroupScore(venture, 'Viable'),
            feasibility: calculateGroupScore(venture, 'Feasible'),
            desirability: calculateGroupScore(venture, 'Desirable'),
        };
    });

    return (
        <div className={`bg-white p-4 rounded-lg shadow ${className}`}>
            <h2 className="text-lg font-semibold mb-4">Venture Opportunity Analysis</h2>
            <div className="h-[400px]">
                <ResponsiveContainer width="100%" height="100%">
                    <ScatterChart margin={{ top: 20, right: 20, bottom: 20, left: 20 }}>
                        <XAxis 
                            type="number" 
                            dataKey="viability" 
                            name="Business Viability" 
                            domain={[0, 100]}
                            label={{ value: 'Business Viability (%)', position: 'bottom' }}
                        />
                        <YAxis 
                            type="number" 
                            dataKey="feasibility" 
                            name="Technical Feasibility" 
                            domain={[0, 100]}
                            label={{ value: 'Technical Feasibility (%)', angle: -90, position: 'left' }}
                        />
                        <ZAxis 
                            type="number" 
                            dataKey="desirability" 
                            range={[1, 10000]} 
                            name="Market Desirability"
                        />
                        <Tooltip 
                            cursor={{ strokeDasharray: '3 3' }}
                            content={({ payload }) => {
                                if (payload && payload.length) {
                                    const data = payload[0].payload;
                                    return (
                                        <div className="bg-white p-2 shadow rounded border">
                                            <p className="font-semibold">{data.name}</p>
                                            <p>Business Viability: {data.viability}%</p>
                                            <p>Technical Feasibility: {data.feasibility}%</p>
                                            <p>Market Desirability: {data.desirability}%</p>
                                        </div>
                                    );
                                }
                                return null;
                            }}
                        />
                        <Scatter 
                            data={scatterData} 
                            fill="#8884d8"
                        />
                    </ScatterChart>
                </ResponsiveContainer>
            </div>
        </div>
    );
} 