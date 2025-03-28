// 按需引入Ant Design Vue组件
import {
  Button,
  Card,
  Form,
  Input,
  Select,
  Table,
  DatePicker,
  Menu,
  Layout,
  Modal,
  message
} from 'ant-design-vue'

const components = [
  Button,
  Card,
  Form,
  Input,
  Select,
  Table,
  DatePicker,
  Menu,
  Layout,
  Modal
]

export function setupAntd(app) {
  components.forEach(component => {
    app.use(component)
  })
  
  app.config.globalProperties.$message = message
} 