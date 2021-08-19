import React from "react";
import Style from './paginado.module.css';

export function Paginate(props) {

  return (
    <div className={Style.Todo}>
      {props.games && Array(Math.ceil(props.games?.length / props.items)).fill(10)
        .map((e, index) => (
          <button className={Style.button}
            key= {index}
            onClick={() => {
              props.handlePaginado(index + 1)
            }}
            >
            {index + 1}
          </button>
        ))}
    </div>
  );
}


export default Paginate