// import React, { useState } from "react";
// import { Form, Input, Button, Upload, message, List, Card, Radio, Modal } from 'antd';
// import { UploadOutlined, EditOutlined, DeleteOutlined } from "@ant-design/icons";
// import { RcFile } from 'antd/es/upload';
// interface Dish {
//   id: number;
//   name: string;
//   price: string;
//   image: string;
//   description: string;
// }
// const AdminNorth: React.FC = () => {
//   const [dishes, setDishes] = useState<Dish[]>([]);
//   const [editingDish, setEditingDish] = useState<Dish | null>(null);
// //   const [imageUrl, setImageUrl] = useState<string | null>(null);
//   const [isUrlInput, setIsUrlInput] = useState<boolean>(false);
  
//   const [isModalVisible, setIsModalVisible] = useState(false);
//   const [imageUrl, setImageUrl] = useState<string>("");
//   const onFinish = (values: any) => {
//     if (editingDish) {
//       // Update existing dish
//       const updatedDishes = dishes.map((dish) =>
//         dish.id === editingDish.id
//           ? { ...dish, ...values, image: imageUrl || dish.image }
//           : dish
//       );
//       setDishes(updatedDishes);
//       message.success("Dish updated successfully!");
//     } else {
//       // Add new dish
//       const newDish: Dish = {
//         id: dishes.length + 1,
//         name: values.name,
//         price: values.price,
//         image: imageUrl,
//         description: values.description,
//       };
//       setDishes([...dishes, newDish]);
//       message.success("Dish added successfully!");
//     }
//     resetForm();
//   };



//   const handleImageUpload = async (file: RcFile): Promise<boolean> => {
//     const reader = new FileReader();
//     reader.onload = () => {
//       setImageUrl(reader.result as string);
//     };
//     reader.readAsDataURL(file);
//     return false;
//   };

//   const handleEdit = (dish: Dish) => {
//     setEditingDish(dish);
//     setIsModalVisible(true);
//     setImageUrl(dish.image);
//   };
//   const handleDelete = (id: number) => {
//     const updatedDishes = dishes.filter((dish) => dish.id !== id);
//     setDishes(updatedDishes);
//     message.success("Dish deleted successfully!");
//   };
//   const resetForm = () => {
//     setIsModalVisible(false);
//     setEditingDish(null);
//     setImageUrl("");
//   };
//   return (
//     <div style={{ padding: "2rem" }}>
//       <h1>North Indian Dishes</h1>
//       <Button style={{marginBottom:'20px'}}
//         type="primary"
//         onClick={() => {
//           setEditingDish(null);
//           setIsModalVisible(true);
//         }}
//       >
//         Add New Dish
//       </Button>
//       <Modal
//         title={editingDish ? "Edit Dish" : "Add Dish"}
//         visible={isModalVisible}
//         onCancel={resetForm}
//         footer={null}
//       >
//         <Form
//           layout="vertical"
//           onFinish={onFinish}
//           initialValues={editingDish ? { ...editingDish } : {}}
//         >
//           <Form.Item
//             label="Dish Name"
//             name="name"
//             rules={[{ required: true, message: "Please input the dish name!" }]}
//           >
//             <Input placeholder="Enter dish name" />
//           </Form.Item>
//           <Form.Item
//             label="Price"
//             name="price"
//             rules={[{ required: true, message: "Please input the price!" }]}
//           >
//             <Input placeholder="Enter price" />
//           </Form.Item>
//           <Form.Item
//             label="Description"
//             name="description"
//             rules={[
//               { required: true, message: "Please input the description!" },
//             ]}
//           >
//             <Input.TextArea placeholder="Enter description" />
//           </Form.Item>
//           <Form.Item label="Select Image Option">
//           <Radio.Group
//             value={isUrlInput ? 'url' : 'upload'}
//             onChange={(e) => setIsUrlInput(e.target.value === 'url')}
//           >
//             <Radio value="upload">Upload Image</Radio>
//             <Radio value="url">Use Image URL</Radio>
//           </Radio.Group>
//         </Form.Item>
//         {isUrlInput ? (
//           <Form.Item
//             label="Image URL"
//             name="imageUrl"
//             rules={[{ required: true, message: 'Please enter the image URL' }]}
//           >
//             <Input />
//           </Form.Item>
//         ) : (
//           <Form.Item label="Upload Image" valuePropName="file">
//             <Upload
//               beforeUpload={handleImageUpload}
//               showUploadList={false}
//               accept="image/*"
//             >
//               <Button icon={<UploadOutlined />}>Click to Upload</Button>
//             </Upload>
//             {imageUrl && (
//               <img
//                 src={imageUrl}
//                 alt="Uploaded"
//                 style={{ width: '100px', marginTop: '10px' }}
//               />
//             )}
//           </Form.Item>
//         )}
//           <Form.Item>
//             <Button type="primary" htmlType="submit">
//               {editingDish ? "Update Dish" : "Add Dish"}
//             </Button>
//           </Form.Item>
//         </Form>
//       </Modal>
//       <h2>Added Dishes</h2>
//       <List
//         grid={{ gutter: 16, column: 4 }}
//         dataSource={dishes}
//         renderItem={(dish) => (
//           <List.Item>
//             <Card
//               hoverable
//               cover={<img alt={dish.name} src={dish.image} />}
//               actions={[
//                 <EditOutlined key="edit" onClick={() => handleEdit(dish)} />,
//                 <DeleteOutlined
//                   key="delete"
//                   onClick={() => handleDelete(dish.id)}
//                 />,
//               ]}
//             >
//               <Card.Meta
//                 title={dish.name}
//                 description={`Price: ₹${dish.price} \n ${dish.description}`}
//               />
//             </Card>
//           </List.Item>
//         )}
//       />
//     </div>
//   );
// };
// export default AdminNorth;