import React from 'react';
import styles from '@store/features/account/ui/Admin/index.module.scss';
import { setMaterialDialog } from '@store/features/materialDialog/api';
import { MaterialDialogTypes } from '@store/features/materialDialog/model';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import ProductsListDnD from '@store/features/account/ui/Admin/Products/ProductsListDnD';
import { useAppDispatch } from '@store/hooks';

const AdminProducts = () => {
  const dispatch = useAppDispatch();
  return (
    <>
      <div
        className={styles.add_product}
        onClick={() =>
          dispatch(
            setMaterialDialog({
              opened: true,
              dialogType: MaterialDialogTypes.PROFILE_ADMIN_ADD_PRODUCT,
            })
          )
        }
      >
        Добавить позицию
      </div>
      <DndProvider backend={HTML5Backend}>
        <ProductsListDnD />
      </DndProvider>
    </>
  );
};

export default AdminProducts;
