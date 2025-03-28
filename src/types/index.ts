export interface LogEntry {
  timestamp: string
  level: 'ERROR' | 'WARN' | 'INFO' | 'DEBUG'
  source: string
  content: string
}

export interface AlertRule {
  id: string
  name: string
  condition: string
  level: string
  status: boolean
  notifyMethods: string[]
}

export interface ChartData {
  trend: Array<[string, number]>
  distribution: Array<{
    name: string
    value: number
  }>
  topErrors: Array<{
    message: string
    count: number
    firstSeen: string
    lastSeen: string
    trendData: number[]
  }>
} 