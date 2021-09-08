import { useState, useEffect } from 'react';

import api from '../../services/api';

import { Header } from '../../components/Header'
import { Food } from '../../components/Food';
import { FoodsContainer } from './styles';
import { ModalEditFood } from '../../components/ModalEditFood';
import { ModalAddFood } from '../../components/ModalAddFood';

type FoodData = {
    id: string,
    name: string,
    image: string,
    description: string
    price: number
    available: boolean
}

export function Dashboard() {

    const [foods, setFoods] = useState<FoodData[]>([] as FoodData[]);
    const [editingFood, setEditingFood] = useState<FoodData>({} as FoodData);
    const [modalOpen, setModalOpen] = useState(false);
    const [editModalOpen, setEditModalOpen] = useState(false);

    useEffect(() => {
        api.get('/foods').then(response => setFoods(response.data));
    }, [])

    async function handleAddFood(data: FoodData) {

        try {

            const response = await api.post('/foods', {
                ...data,
                available: true,
            });

            console.log(response);

            setFoods([...foods, response.data]);

        } catch (err) {
            console.log('erro', err);
        }

    }

    async function handleUpdateFood(data: FoodData) {

        try {

            const foodUpdated = await api.put(
                `/foods/${editingFood.id}`,
                { ...editingFood, ...data },
            );

            const foodsUpdated = foods.map(f =>
                f.id !== foodUpdated.data.id ? f : foodUpdated.data,
            );

            setFoods(foodsUpdated)

        } catch (err) {
            console.log(err);
        }

    }

    async function handleDeleteFood(id: string) {

        await api.delete(`/foods/${id}`);

        const foodsFiltered = foods.filter(food => food.id !== id);

        setFoods(foodsFiltered);

    }

    function toggleModal() {

        setModalOpen(!modalOpen);

    }

    function toggleEditModal() {

        setEditModalOpen(!editModalOpen);

    }

    function handleEditFood(food: FoodData) {

        setEditingFood(food);
        setEditModalOpen(true);

    }

    return (
        <>
            <Header openModal={toggleModal} />
            <ModalAddFood
                isOpen={modalOpen}
                setIsOpen={toggleModal}
                handleAddFood={handleAddFood}
            />
            <ModalEditFood
                isOpen={editModalOpen}
                setIsOpen={toggleEditModal}
                editingFood={editingFood}
                handleUpdateFood={handleUpdateFood}
            />
            <FoodsContainer data-testid="foods-list">
                {foods &&
                    foods.map(food => (
                        <Food
                            key={food.id}
                            food={food}
                            handleDelete={handleDeleteFood}
                            handleEditFood={() => handleEditFood(food)}
                        />
                    ))}
            </FoodsContainer>
        </>
    )

}