import React,{useState} from 'react';
import { Card, Col, Row,Button } from 'antd';
import 'antd/dist/reset.css'; 

const thali = [
  { id: 1, name: 'Special Thali', description: 'A thin and crispy pancake made from fermented rice and lentil batter.', image: 'https://img.etimg.com/thumb/msid-94249140,width-640,height-480,imgsize-126922,resizemode-4/pm-modis-birthday-special.jpg' },
  { id: 2, name: 'Mini Thali', description: 'Steamed rice cakes made from fermented rice and lentil batter.', image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTfPiNL9sH8-UXIj-QFErcwE6t2mPerIaiPQw&s' },
  { id: 3, name: 'Sambhar Vada', description: 'A spicy and tangy lentil soup with vegetables.', image: 'https://media.istockphoto.com/id/1292633263/photo/indian-fried-snack-medu-vada-with-sambar-and-coconut-chutney-in-plate-on-rustic-wooden.jpg?s=612x612&w=0&k=20&c=I24Sl76Qq4ly7WlI3HJJa8VfCIkBxvsgVZ8mAb81ZEA=' },
  { id: 4, name: 'Uttapam', description: 'Deep-fried lentil donuts.', image: 'https://thumbs.dreamstime.com/b/uttapam-or-uthappam-are-south-indian-breakfast-pancakes-made-lentils-rice-tomato-onions-uthappam-or-uttapam-is-type-192898108.jpg' },

];
const Thali: React.FC = () => {
    const [quantity, setquantity] = useState<number[]>([1,1,1,1]);

    const handleIncrement = (index: number) => {
        const updatedQuantities = [...quantity];
        updatedQuantities[index] += 1;
        setquantity(updatedQuantities);
    }
    const handleDecrement = (index:number)=>{
        const updatedQuantities = [...quantity];
        if(updatedQuantities[index]>0){
            updatedQuantities[index] -= 1;
        }
        setquantity(updatedQuantities);
        
    }
  return (
    <div style={{ padding: '80px' , objectFit:'cover' }}>
        <h1>Explore the variety of Thalis</h1>
        <br />
        <div style={{textAlign:'center',marginLeft:'35%'}}>
        <Col span={10}>
          <Card
            hoverable
            cover={<img alt="South Indian Foods" src="https://thumbs.dreamstime.com/b/indian-thali-26440151.jpg" className="card-image" />}
            className="category-card"
           
          >
            <Card.Meta title="South Indian Foods" description="Explore South Indian dishes" />
          </Card>
        </Col>
        </div>
        
        <br />
      <Row gutter={16}>
        {thali.map((food,index) => (
          <Col span={4} key={food.id}>
            <Card
              hoverable
              cover={<img alt={food.name} src={food.image} />}
            >
              {/* <Card.Meta title={food.name} description={food.description} /> */}
              <Card.Meta title={food.name} description={food.description}/>
                            <div style={{marginTop:'10px',display:'flex', justifyContent:'center',alignItems:'center'}}>
                                <Button onClick={() => handleDecrement(index)}>-</Button>
                                <span style={{margin: '0 10px', fontSize:'16px'}}>{quantity[index]}</span>
                                <Button onClick={() => handleIncrement(index)}>+</Button>


                            </div>

                            <div style={{marginTop:'10px', justifyContent:'center',textAlign:'center'}}>
                                <Button type='primary'>Add to cart</Button>
                            </div>

            </Card>
          </Col>
        ))}
      </Row>
    </div>
  );
};
export default Thali;