// import React from 'react';
// import { Card, Col, Row } from 'antd';
// import { Link } from 'react-router-dom';
// const categories = [
//   { id: 'south-indian', name: 'South Indian', image: 'path-to-south-indian-image.jpg' },
//   { id: 'north-indian', name: 'North Indian', image: 'path-to-north-indian-image.jpg' },
//   { id: 'thali', name: 'Thali', image: 'path-to-thali-image.jpg' },
// ];
// const CategoriesPage: React.FC = () => {
//   return (
//     <div style={{ padding: '24px' }}>
//       <h1>Categories</h1>
//       <Row gutter={16}>
//         {categories.map(category => (
//           <Col span={8} key={category.id}>
//             <Link to={`/dishes/${category.id}`}>
//               <Card
//                 hoverable
//                 cover={<img alt={category.name} src={category.image} style={{ height: 150, objectFit: 'cover' }} />}
//                 title={category.name}
//                 style={{ width: '100%' }}
//               >
//                 <p>Click to view dishes</p>
//               </Card>
//             </Link>
//           </Col>
//         ))}
//       </Row>
//     </div>
//   );
// };
// export default CategoriesPage;