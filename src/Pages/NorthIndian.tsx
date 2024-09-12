import React, { useState } from 'react';
import { Card, Col, Row, Button } from 'antd';
import 'antd/dist/reset.css';

const northIndian = [
  { id: 1, name: 'Chole Bhature', description: 'A thin and crispy pancake made from fermented rice and lentil batter.', image: 'https://www.shutterstock.com/image-photo/chole-bhature-north-indian-food-600nw-2241211669.jpg' },
  { id: 2, name: 'Aloo Paratha', description: 'Steamed rice cakes made from fermented rice and lentil batter.', image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/54/Aloo_Paratha_also_known_as_Batatay_Jo_Phulko.jpg/640px-Aloo_Paratha_also_known_as_Batatay_Jo_Phulko.jpg' },
  { id: 3, name: 'Sambhar Vada', description: 'A spicy and tangy lentil soup with vegetables.', image: 'https://media.istockphoto.com/id/1292633263/photo/indian-fried-snack-medu-vada-with-sambar-and-coconut-chutney-in-plate-on-rustic-wooden.jpg?s=612x612&w=0&k=20&c=I24Sl76Qq4ly7WlI3HJJa8VfCIkBxvsgVZ8mAb81ZEA=' },
  { id: 4, name: 'Uttapam', description: 'Deep-fried lentil donuts.', image: 'https://thumbs.dreamstime.com/b/uttapam-or-uthappam-are-south-indian-breakfast-pancakes-made-lentils-rice-tomato-onions-uthappam-or-uttapam-is-type-192898108.jpg' },
  { id: 5, name: 'Sambhar Vada', description: 'A spicy and tangy lentil soup with vegetables.', image: 'https://media.istockphoto.com/id/1292633263/photo/indian-fried-snack-medu-vada-with-sambar-and-coconut-chutney-in-plate-on-rustic-wooden.jpg?s=612x612&w=0&k=20&c=I24Sl76Qq4ly7WlI3HJJa8VfCIkBxvsgVZ8mAb81ZEA=' },
  { id: 6, name: 'Uttapam', description: 'Deep-fried lentil donuts.', image: 'https://thumbs.dreamstime.com/b/uttapam-or-uthappam-are-south-indian-breakfast-pancakes-made-lentils-rice-tomato-onions-uthappam-or-uttapam-is-type-192898108.jpg' },

];
const NorthIndian: React.FC = () => {
  const [quantity, setquantity] = useState<number[]>([1, 1, 1, 1]);

  const handleIncrement = (index: number) => {
    const updatedQuantities = [...quantity];
    updatedQuantities[index] += 1;
    setquantity(updatedQuantities);
  }
  const handleDecrement = (index: number) => {
    const updatedQuantities = [...quantity];
    if (updatedQuantities[index] > 0) {
      updatedQuantities[index] -= 1;
    }
    setquantity(updatedQuantities);
  }

  return (
    <div style={{ padding: '80px', objectFit: 'cover', overflow: 'auto', marginTop: '-50px' }}>
      <h1>Explore the the North Indian Foods</h1>
      <div style={{ textAlign: 'center', marginLeft: '35%' }}>
        <Col span={10}>
          <Card
            hoverable
            cover={<img alt="South Indian Foods" src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSipip84cyHknfHz5u2havCf2lbvgLlPJHPhA&s" className="card-image" />}
            className="category-card"

          >
            <Card.Meta title="South Indian Foods" description="Explore South Indian dishes" />
          </Card>
        </Col>
      </div>

      <br />
      <Row gutter={16}>
        {northIndian.map((food, index) => (
          <Col span={4} key={food.id}>
            <Card
              hoverable
              cover={<img alt={food.name} src={food.image} />}
            >
              {/* <Card.Meta title={food.name} description={food.description} /> */}
              <Card.Meta title={food.name} description={food.description} />
              <div style={{ marginTop: '10px', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                <Button onClick={() => handleDecrement(index)}>-</Button>
                <span style={{ margin: '0 10px', fontSize: '16px' }}>{quantity[index]}</span>
                <Button onClick={() => handleIncrement(index)}>+</Button>


              </div>

              <div style={{ marginTop: '10px', justifyContent: 'center', textAlign: 'center' }}>
                <Button type='primary'>Add to cart</Button>
              </div>
            </Card>
          </Col>
        ))}
      </Row>
    </div>
  );
};
export default NorthIndian;