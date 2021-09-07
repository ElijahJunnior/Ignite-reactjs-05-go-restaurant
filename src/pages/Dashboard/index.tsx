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

    async function handleAddFood() {

        // ### DECLARAÇÃO ORIGINAL DA FUNÇÃO ###
        //   handleAddFood = async food => {
        // ### FIM DECLARAÇÃO ORIGINAL DA FUNÇÃO ###

        // const { foods } = this.state;

        // try {
        //   const response = await api.post('/foods', {
        //     ...food,
        //     available: true,
        //   });

        //   this.setState({ foods: [...foods, response.data] });
        // } catch (err) {
        //   console.log(err);
        // }

    }

    async function handleUpdateFood() {

        // ### DECLARAÇÃO ORIGINAL DA FUNÇÃO ###
        //   handleUpdateFood = async food => {
        // ### FIM DECLARAÇÃO ORIGINAL DA FUNÇÃO ###

        // const { foods, editingFood } = this.state;

        // try {
        //     const foodUpdated = await api.put(
        //         `/foods/${editingFood.id}`,
        //         { ...editingFood, ...food },
        //     );

        //     const foodsUpdated = foods.map(f =>
        //         f.id !== foodUpdated.data.id ? f : foodUpdated.data,
        //     );

        //     this.setState({ foods: foodsUpdated });
        // } catch (err) {
        //     console.log(err);
        // }

    }

    async function handleDeleteFood() {

        // ### DECLARAÇÃO ORIGINAL DA FUNÇÃO ###
        //        handleDeleteFood = async id => {
        // ### FIM DECLARAÇÃO ORIGINAL DA FUNÇÃO ###

        // const { foods } = this.state;

        // await api.delete(`/foods/${id}`);

        // const foodsFiltered = foods.filter(food => food.id !== id);

        // this.setState({ foods: foodsFiltered });

    }

    function toggleModal() {

        setModalOpen(!modalOpen);

    }

    function toggleEditModal() {

        setEditModalOpen(!editModalOpen);

    }

    function handleEditFood(food: FoodData) {

        //setEditingFood({ available: false, id: 'a', description: 'teste', image: 'test', name: 'teste', price: 1.99 });
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



// class Dashboard extends Component {
//   constructor(props) {
//     super(props);
//     this.state = {
//       foods: [],
//       editingFood: {},
//       modalOpen: false,
//       editModalOpen: false,
//     }
//   }

// #FEITO
//   async componentDidMount() {
//     const response = await api.get('/foods');

//     this.setState({ foods: response.data });
//   }

//   handleAddFood = async food => {
//     const { foods } = this.state;

//     try {
//       const response = await api.post('/foods', {
//         ...food,
//         available: true,
//       });

//       this.setState({ foods: [...foods, response.data] });
//     } catch (err) {
//       console.log(err);
//     }
//   }

//   handleUpdateFood = async food => {
//     const { foods, editingFood } = this.state;

//     try {
//       const foodUpdated = await api.put(
//         `/foods/${editingFood.id}`,
//         { ...editingFood, ...food },
//       );

//       const foodsUpdated = foods.map(f =>
//         f.id !== foodUpdated.data.id ? f : foodUpdated.data,
//       );

//       this.setState({ foods: foodsUpdated });
//     } catch (err) {
//       console.log(err);
//     }
//   }

//   handleDeleteFood = async id => {
//     const { foods } = this.state;

//     await api.delete(`/foods/${id}`);

//     const foodsFiltered = foods.filter(food => food.id !== id);

//     this.setState({ foods: foodsFiltered });
//   }

//   toggleModal = () => {
//     const { modalOpen } = this.state;

//     this.setState({ modalOpen: !modalOpen });
//   }

//   toggleEditModal = () => {
//     const { editModalOpen } = this.state;

//     this.setState({ editModalOpen: !editModalOpen });
//   }

//   handleEditFood = food => {
//     this.setState({ editingFood: food, editModalOpen: true });
//   }

//   render() {
//     const { modalOpen, editModalOpen, editingFood, foods } = this.state;

//     return (
//       <>
//         <Header openModal={this.toggleModal} />
//         <ModalAddFood
//           isOpen={modalOpen}
//           setIsOpen={this.toggleModal}
//           handleAddFood={this.handleAddFood}
//         />
//         <ModalEditFood
//           isOpen={editModalOpen}
//           setIsOpen={this.toggleEditModal}
//           editingFood={editingFood}
//           handleUpdateFood={this.handleUpdateFood}
//         />

//         <FoodsContainer data-testid="foods-list">
//           {foods &&
//             foods.map(food => (
//               <Food
//                 key={food.id}
//                 food={food}
//                 handleDelete={this.handleDeleteFood}
//                 handleEditFood={this.handleEditFood}
//               />
//             ))}
//         </FoodsContainer>
//       </>
//     );
//   }
// };

// export default Dashboard;
