import React, { useState, useEffect } from 'react';
import { Button, Field, Input, Modal } from '@grafana/ui';
import { css, cx } from 'emotion';

type User = {
  id?: number | string;
  name?: string;
  age?: number | string;
};

type CreateModalProps = {
  isOpen: boolean;
  onClose: () => void;

  type: 'create' | 'edit';
  data?: User | null;
};

export default function CreateModal({ isOpen, onClose, type = 'create', data = null }: CreateModalProps) {
  const [user, setUser] = useState<User | null>();

  useEffect(() => {
    if (data) {
      setUser(data);
    }
  }, [data]);

  const handleChange = (e: any) => setUser({ ...user, [e.target.name]: e.target.value });

  const handleSubmit = (e: any) => {
    e.preventDefault();

    if (type === 'create') {
      console.log('creat: ', user);
    } else {
      console.log('update: ', user);
    }
  };

  const handleDelete = () => {};

  return (
    <Modal
      title={type === 'create' ? 'Create user' : 'Update user'}
      isOpen={isOpen}
      onClickBackdrop={onClose}
      onDismiss={onClose}
    >
      <form onSubmit={handleSubmit}>
        <Field
          className={cx(
            css`
              width: 100%;
            `
          )}
          label="ID"
          error="ID is required"
        >
          <Input required type="number" name="id" value={user?.id} onChange={handleChange} />
        </Field>

        <Field
          className={cx(
            css`
              width: 100%;
            `
          )}
          label="Name"
          error="Name is required"
        >
          <Input required name="name" value={user?.name} onChange={handleChange} />
        </Field>

        <Field
          className={cx(
            css`
              width: 100%;
            `
          )}
          label="Age"
          error="Age is required"
        >
          <Input required type="number" name="age" value={user?.age} onChange={handleChange} />
        </Field>

        <Button
          className={cx(
            css`
              margin-right: 16px;
            `
          )}
          type="submit"
        >
          {type === 'create' ? 'Create User' : 'Updaet User'}
        </Button>
        {type === 'edit' && (
          <Button onClick={handleDelete} variant="destructive">
            Delete
          </Button>
        )}
      </form>
    </Modal>
  );
}
