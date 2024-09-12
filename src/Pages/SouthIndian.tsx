import React, { useState } from 'react';
import { Button, Card, Col,  Row } from 'antd';
import 'antd/dist/reset.css';
import '../css/SouthIndian.css'
// Sample data
// interface Dish {
//     id: number;
//     name: string;
//     price: number;
//     image: string;
// }
const southIndian = [
    { id: 1, name: 'Dosa', description: 'A thin and crispy pancake made from fermented rice and lentil batter.', image: 'https://media.istockphoto.com/id/909906350/photo/masala-dosa-south-indian-food.jpg?s=612x612&w=0&k=20&c=3CI-bw2NhYaX_t0-CZIXIIXsOygFcUaoGSmzbnVB-fU=' },
    { id: 2, name: 'Idli', description: 'Steamed rice cakes made from fermented rice and lentil batter.', image: 'https://cdn.pixabay.com/photo/2017/06/16/11/38/breakfast-2408818_1280.jpg' },
    { id: 3, name: 'Sambhar Vada', description: 'A spicy and tangy lentil soup with vegetables.', image: 'https://media.istockphoto.com/id/1292633263/photo/indian-fried-snack-medu-vada-with-sambar-and-coconut-chutney-in-plate-on-rustic-wooden.jpg?s=612x612&w=0&k=20&c=I24Sl76Qq4ly7WlI3HJJa8VfCIkBxvsgVZ8mAb81ZEA=' },
    { id: 4, name: 'Uttapam', description: 'Deep-fried lentil donuts.', image: 'https://thumbs.dreamstime.com/b/uttapam-or-uthappam-are-south-indian-breakfast-pancakes-made-lentils-rice-tomato-onions-uthappam-or-uttapam-is-type-192898108.jpg' },
    { id: 5, name: 'Sambhar Vada', description: 'A spicy and tangy lentil soup with vegetables.', image: 'https://media.istockphoto.com/id/1292633263/photo/indian-fried-snack-medu-vada-with-sambar-and-coconut-chutney-in-plate-on-rustic-wooden.jpg?s=612x612&w=0&k=20&c=I24Sl76Qq4ly7WlI3HJJa8VfCIkBxvsgVZ8mAb81ZEA=' },
    { id: 6, name: 'Uttapam', description: 'Deep-fried lentil donuts.', image: 'https://thumbs.dreamstime.com/b/uttapam-or-uthappam-are-south-indian-breakfast-pancakes-made-lentils-rice-tomato-onions-uthappam-or-uttapam-is-type-192898108.jpg' },
    // Add more items as needed
];
const SouthIndian: React.FC = () => {
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
        <div style={{ padding: '40px' }}>
            <h1 style={{marginBottom:'30px' , marginTop:'-30px'}}>Explore the south Indian foods</h1>
            <div style={{textAlign:'center',marginLeft:'35%'}}>
            <Col span={10}>
                <Card
                    hoverable
                    cover={<img alt="South Indian Foods" src="https://static.vecteezy.com/system/resources/thumbnails/035/376/005/small_2x/ai-generated-south-indian-food-idli-sambar-with-coconut-chutney-photo.jpg" className="card-image" />}
                    className="category-card"

                >
                    <Card.Meta title="South Indian Foods" description="Explore South Indian dishes" />

                </Card>
            </Col>
            </div>
            

            <Row gutter={16}>
                

                {southIndian.map((food, index) => (

                    <Col span={4} key={food.id}>
                        <br />
                        <Card
                            hoverable
                            cover={<img alt={food.name} src={food.image} />}
                        >
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
export default SouthIndian;