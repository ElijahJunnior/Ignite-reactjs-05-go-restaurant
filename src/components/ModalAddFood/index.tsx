import { useState } from 'react';
import { FiCheckSquare } from 'react-icons/fi';

import { Form } from './styles';
import { Modal } from '../Modal';
import { Input } from '../Input';

type ModalAddFood = {
  isOpen: boolean,
  setIsOpen: () => void,
  handleAddFood: (data: Food) => void
}

type Food = {
  name: string,
  image: string,
  price: number,
  description: string
}

export function ModalAddFood(props: ModalAddFood) {

  const { isOpen, setIsOpen, handleAddFood } = props;

  const [name, setName] = useState('');;
  const [image, setImage] = useState('');
  const [price, setPrice] = useState(0);
  const [description, setDescription] = useState('');

  function handleSubmit() {

    handleAddFood({ name, image, price, description });

    setName(''); setImage(''); setPrice(0); setDescription('');

    setIsOpen();

  };

  return (

    <Modal isOpen={isOpen} onRequestCloese={setIsOpen}>

      <Form onSubmit={handleSubmit}>

        <h1>Novo Prato</h1>

        <Input
          name="image" placeholder="Cole o link aqui"
          onChange={event => setImage(event.target.value)}
          value={image}
        />

        <Input
          name="name" placeholder="Ex: Moda Italiana"
          onChange={event => setName(event.target.value)}
          value={name}
        />

        <Input name="price" placeholder="Ex: 19.90" type='number'
          onChange={event => setPrice(event.target.valueAsNumber)}
          value={price}
        />

        <Input name="description" placeholder="Descrição"
          onChange={event => setDescription(event.target.value)}
          value={description}
        />

        <button type="submit" data-testid="add-food-button">

          <p className="text">Adicionar Prato</p>

          <div className="icon">

            <FiCheckSquare size={24} />

          </div>

        </button>

      </Form>

    </Modal>

  );

}