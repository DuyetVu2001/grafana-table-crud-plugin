import React, { useState } from 'react';
import { PanelProps } from '@grafana/data';
import { SimpleOptions } from 'types';
import { css, cx } from 'emotion';
import {
  Button,
  stylesFactory,
  // useTheme
} from '@grafana/ui';
import CreateModal from 'components/CreateModal';

interface Props extends PanelProps<SimpleOptions> {}

const rotate90Degree2DArray = (arr: [any][any]) => {
  const newArr = [];

  for (let i = 0; i < arr[0].length; i++) {
    const newRow = [];

    for (let j = arr.length - 1; j >= 0; j--) {
      newRow.push(arr[j][i]);
    }
    newArr.push(newRow.reverse());
  }

  return newArr;
};

export const SimplePanel: React.FC<Props> = ({
  // options,
  data,
  width,
  height,
}) => {
  const [modalCreate, setModalCreate] = useState({
    isOpen: false,
    type: 'create' as 'create' | 'edit',
    data: null as any,
  });

  // const theme = useTheme();
  const styles = getStyles();

  let headers: any[] = [];

  if (data.series[0] && data.series[0].fields) {
    headers = data.series[0].fields.map((field) => field.name);
  }

  let coloumns: any[][] = [];

  if (data.series[0] && data.series[0].fields) {
    coloumns = data.series[0].fields.map((field) => field.values.toArray());

    coloumns = rotate90Degree2DArray(coloumns);
  }

  return (
    <div
      className={cx(
        styles.wrapper,
        css`
          width: ${width}px;
          height: ${height}px;
          overflow: hidden;
        `
      )}
    >
      {/* create button */}
      <div
        className={cx(css`
          display: flex;
          justify-content: flex-end;
          margin-bottom: 10px;
        `)}
      >
        <Button onClick={() => setModalCreate({ ...modalCreate, isOpen: true, type: 'create' })}>Create</Button>
      </div>

      <div
        className={cx(css`
          height: ${height - 60}px;
          overflow: auto;
        `)}
      >
        <table className={cx(styles.table)}>
          <tr>
            {headers.length > 0 &&
              headers.map((header) => (
                <th
                  key={header}
                  className={css`
                    border: 1px solid rgb(20, 22, 25);
                    text-align: left;
                    padding: 6px;
                  `}
                >
                  {header}
                </th>
              ))}
          </tr>

          {coloumns.length > 0 &&
            coloumns.map((record, index1) => (
              <tr
                className={cx(
                  css`
                    &:hover {
                      background-color: rgb(25, 27, 30);
                      cursor: pointer;
                    }
                  `
                )}
                key={index1}
                onClick={() =>
                  setModalCreate({
                    ...modalCreate,
                    isOpen: true,
                    type: 'edit',
                    data: {
                      id: coloumns[index1][0],
                      name: coloumns[index1][1],
                      age: coloumns[index1][2],
                    },
                  })
                }
              >
                {headers.map((_, index2) => (
                  <td
                    key={`${index1}-${index2}`}
                    className={cx(
                      css`
                        border: 1px solid rgb(20, 22, 25);
                        text-align: left;
                        padding: 6px;
                      `
                    )}
                  >
                    {record[index2]}
                  </td>
                ))}
              </tr>
            ))}
        </table>
      </div>

      {/* modals */}
      <CreateModal
        isOpen={modalCreate.isOpen}
        type={modalCreate?.type}
        data={modalCreate?.data}
        onClose={() => setModalCreate({ ...modalCreate, isOpen: false, data: null })}
      />
    </div>
  );
};

const getStyles = stylesFactory(() => {
  return {
    wrapper: css`
      position: relative;
    `,

    table: css`
      font-family: arial, sans-serif;
      border-collapse: collapse;
      width: 100%;
    `,

    cell: `
      border: 1px solid #dddddd;
      text-align: left;
      padding: 8px;
    `,

    row: `
      &:hover {
        background-color: #ddd;
        cursor: pointer;
      }
    `,

    createBtn: `
      display: flex;
      justify-content: flex-end;
      margin-bottom: 10px;
    `,
  };
});
