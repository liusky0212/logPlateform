import { useUserStore } from '@/stores/user'

export const permission = {
  mounted(el, binding) {
    const { value } = binding
    const userStore = useUserStore()
    const { roles } = userStore.userInfo

    if (value && value.length > 0) {
      const hasPermission = roles.some(role => value.includes(role))
      if (!hasPermission) {
        el.parentNode && el.parentNode.removeChild(el)
      }
    }
  }
} 