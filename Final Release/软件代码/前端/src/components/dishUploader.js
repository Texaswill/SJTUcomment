import React, { useState } from 'react';
import {Input, Button, message, Select, Divider} from 'antd';
import "../css/dishuploader.css"

function DishForm() {
    const [dishName, setDishName] = useState('');
    const [imageUrl, setImageUrl] = useState('');
    const [flavor, setFlavor] = useState('');
    const [description, setDescription] = useState('');
    const [location,setLocation]=useState('');
    const [type,setType]=useState('');
    const [price,setPrice] = useState('');
    const [taste,setTaste]=useState('');
    const handletasteChange = (value) => {
     setTaste(value);
 }
    const handleDishNameChange = (e) => {
        setDishName(e.target.value);
    };

    const handleImageUrlChange = (e) => {
        setImageUrl(e.target.value);
    };

    const handleTasteChange = (e) => {
        setFlavor(e.target.value);
    };

    const handleDescriptionChange = (e) => {
        setDescription(e.target.value);
    }

    const handlePriceChange =(e) =>{
        setPrice(e.target.value);
    }
    const handleSubmit = () => {
        if (dishName.trim() === '') {
            message.error('菜品名称不能为空');
            return;
        }

        const dishData = {
            name: dishName,
            img_url:imageUrl,
            description,
            price,
            flavor,
            location,
            type,
            taste,
            canteen: "1"
        };

        fetch('http://localhost:8080/dish', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(dishData)
        })
            .then(response => {
                if (response.ok) {
                    console.log('Dish submitted successfully');
                    // 清空输入框
                    alert('添加成功！')
                    window.location.replace('/home/ProfilePage')
                }
                else {
                    console.error('Error submitting dish');
                }
            })
            .catch(error => console.error(error));
    };
    const handleLocationChange = (value) => {
        setLocation(value);
    };

    const handleTypeChange =(value) =>{
        setType(value)
        console.log(type)
    }
    const Type = () => (
        <Select id={"类型"}
            //labelInValue
                value={type}
                defaultValue={1}
                style={{
                    width: 120,
                }}
                onChange={handleTypeChange}
                options={[
                    {
                        value: 1,
                        label: '面食',
                    },
                    {
                        value: 2,
                        label: '香锅',
                    },
                    {
                        value: 3,
                        label: '自选菜',
                    },
                    {
                        value: 4,
                        label: '铁板',
                    },
                    {
                        value: 5,
                        label: '木桶饭',
                    },
                    {
                        value: 6,
                        label: '其他',
                    },
                ]}
        />
    );

    const Taste = () => (
        <Select id={"taste"}
            //labelInValue
                value={taste}
                style={{
                    width: 120,
                }}
                onChange={handletasteChange}
                options={[
                    {
                        value: 0,
                        label: '咸甜',
                    },
                    {
                        value: 1,
                        label: '鲜香',
                    },
                    {
                        value: 2,
                        label: '清淡',
                    },
                    {
                        value: 3,
                        label: '酸甜',
                    },
                    {
                        value: 4,
                        label: '鲜辣',
                    },
                    {
                        value: 5,
                        label: '麻辣',
                    },
                ]}
        />
    );

    const Location = () => (
        <Select id={"地址"}
            //labelInValue
                value={location}
                style={{
                    width: 120,
                }}
                onChange={handleLocationChange}
                options={[
                    {
                        value: 1,
                        label: '一餐',
                    },
                    {
                        value: 2,
                        label: '二餐',
                    },
                    {
                        value: 3,
                        label: '三餐',
                    },
                    {
                        value: 4,
                        label: '四餐',
                    },
                    {
                        value: 5,
                        label: '五餐',
                    },
                    {
                        value: 6,
                        label: '六餐',
                    },
                    {
                        value: 7,
                        label: '七餐',
                    },
                    {
                        value: 8,
                        label: '玉兰苑',
                    },
                ]}
        />
    );

    return (
        <div className="page">
            <h1 className="title">菜品上传</h1>

            <Divider />
            <h2>菜品名称</h2>
            <Input className="dishname" value={dishName} onChange={handleDishNameChange} placeholder="菜品名称" />
            <h2>菜品图片url</h2>
            <Input className="imageurl" value={imageUrl} onChange={handleImageUrlChange} placeholder="菜品图片URL" />
            <h2>菜品口味</h2>
            <Input className="flavor" value={flavor} onChange={handleTasteChange} placeholder="菜品口味" />
            <h2>菜品价格</h2>
            <Input className="price" value={price} onChange={handlePriceChange} placeholder="菜品价格" />
            <Divider />
            <h2>请选择餐厅位置</h2>
            <Location/>
            <h2>请选择菜品种类</h2>
            <Type/>
            <h2>请选择菜品口味</h2>
            <Taste/>
            <h2>菜品描述</h2>
            <textarea className="description" value={description} onChange={handleDescriptionChange} placeholder="菜品描述" />
            <Divider />

            <Button type="primary" className="button_submit" onClick={handleSubmit}>提交</Button>

        </div>
    );
}

export default DishForm;
