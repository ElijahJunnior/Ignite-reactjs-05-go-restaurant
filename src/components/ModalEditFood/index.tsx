import { useRef } from 'react';
import { FiCheckSquare } from 'react-icons/fi';

import { Form } from './styles';
import { Modal } from '../Modal';
import { Input } from '../Input';

type ModalEditFoodProps = {
  isOpen: boolean,
  setIsOpen: () => void,
  editingFood: Food,
  handleUpdateFood: (food: Food) => Promise<void>
}

type Food = {
  id: string,
  name: string,
  image: string,
  price: number,
  description: string
  available: boolean
}

export function ModalEditFood(props: ModalEditFoodProps) {

  const { isOpen, setIsOpen, editingFood, handleUpdateFood } = props;

  const formRef = useRef(null);

  function handleSubmit(prop: Food) {
    handleUpdateFood(prop);
    setIsOpen();
  };

  return (
    <Modal isOpen={isOpen} setIsOpen={setIsOpen}>
      <Form ref={formRef} onSubmit={handleSubmit} initialData={editingFood}>
        <h1>Editar Prato</h1>
        <Input name="image" placeholder="Cole o link aqui" />
        <Input
          name="name" placeholder="Ex: Moda Italiana" />
        <Input name="price" placeholder="Ex: 19.90" />
        <Input name="description" placeholder="Descrição" />
        <button type="submit" data-testid="edit-food-button">
          <div className="text">Editar Prato</div>
          <div className="icon">
            <FiCheckSquare size={24} />
          </div>
        </button>
      </Form>
    </Modal>
  )

}