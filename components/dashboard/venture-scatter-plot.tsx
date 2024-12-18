import { Venture } from "@/lib/types/venture";
import { ScatterChart, Scatter, XAxis, YAxis, ZAxis, Tooltip, ResponsiveContainer } from 'recharts';

interface VentureScatterPlotProps {
  ventures: Venture[];
  className?: string;
}

export function VentureScatterPlot({ ventures, className }: VentureScatterPlotProps) {
    console.log("ventures ==>", ventures);
  const scatterData = ventures.map(venture => ({
    name: venture.name,
    viability: venture.viability || 0,
    feasibility: venture.feasibility || 0,
    desirability: venture.desirability || 0,
  }));

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
              range={[400, 2000]} 
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