import { HomeOutlined, UserOutlined } from '@ant-design/icons';
import { Breadcrumb } from 'antd';
import { Link } from 'react-router';

export default function Breadcrumbs(props) {

  console.log(props);
  return (
    <>
      <Breadcrumb
        items={[
          {
            path: "",
            title:(
          <>              
            <HomeOutlined />,
            <span>"Home Page"</span>
          </>
        )},
          {
            path: '',
            title: '',
          },
          {
            title: '',
          },
        ]}
      />
    </>
  )
}
