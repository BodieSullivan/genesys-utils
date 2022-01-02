import { Divider, Space, Tag, Typography } from "antd";
import TalentItem from "./TalentItem";
const { Paragraph } = Typography;

function Talent(props: {talent: TalentItem}): JSX.Element {

    return (
    <div style={{backgroundColor: "white", padding: "0 10px 0 10px"}}>    
      <Space direction='vertical' >
        <h2>{props.talent.name}</h2>
        <div>
          <Tag>Tier: {props.talent.tier}</Tag>
          <Tag>{props.talent.activation}</Tag>
          {props.talent.ranked === 'Yes' ? <Tag>Ranked</Tag> : ''}
          <Tag>Source: {props.talent.source}</Tag>
        </div>
        {/* <h3>Tier: <span style={{fontSize: "14px"}}>{props.talent.tier}, Activation: {props.talent.activation}{props.talent.ranked === 'Yes' ? ', Ranked': ''}, </span>Source: {props.talent.source}</h3> */}
        <Paragraph copyable>{props.talent.description}</Paragraph>
      </Space>
      <Divider />
    </div>);

}

export default Talent;

