import { useQuery } from '@tanstack/react-query'

import { getTaskDetail } from '@/server/actions/task'

export const useGetTaskDetail = (taskId: string) =>
  useQuery({
    queryKey: ['task', taskId],
    queryFn: async () => getTaskDetail(taskId)
  })
