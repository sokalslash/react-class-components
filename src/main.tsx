import React, { StrictMode, ChangeEvent } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";

const mockParams: Param[] = [
  {
    id: 1,
    name: "Назначение",
  },
  {
    id: 2,
    name: "Длина",
  },
];

const mockModel = {
  paramValues: [
    {
      paramId: 1,
      value: "повседневное",
    },
    {
      paramId: 2,
      value: "макси",
    },
  ],
};

interface Color {
  color: string;
}

interface Param {
  id: number;
  name: string;
  type?: string;
}
interface ParamValue {
  paramId: number;
  value: string;
}
interface Model {
  paramValues: ParamValue[];
  colors?: Color[];
}
interface Props {
  params: Param[];
  model: Model;
}
interface State {
  params: Param[];
  model: Model;
}

class ParamEditor extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);

    this.state = {
      params: props.params,
      model: props.model,
    };

    this.handleChange = this.handleChange.bind(this);
  }

  public getModel(): Model {
    console.log(this.state.model);
    return this.state.model;
  }

  handleChange(event: ChangeEvent<HTMLInputElement>) {
    const { name, value } = event.target;
    this.setState((prevState) => ({
      model: {
        ...prevState.model,
        paramValues: prevState.model.paramValues.map((paramValue) =>
          paramValue.paramId === parseInt(name)
            ? { ...paramValue, value: value }
            : paramValue
        ),
      },
    }));
  }

  render() {
    return (
      <form className="form">
        <div className="form__wrapper form__label">
          {this.state.params.map((param) => (
            <label key={param.id} htmlFor={`${param.id}`}>
              {param.name}
            </label>
          ))}
        </div>

        <div className="form__wrapper">
          {this.state.model.paramValues.map((paramValue) => (
            <input
              key={paramValue.paramId}
              value={paramValue.value}
              id={`${paramValue.paramId}`}
              type="text"
              name={`${paramValue.paramId}`}
              onChange={this.handleChange}
            />
          ))}
        </div>
        <button type={"button"} onClick={() => this.getModel()}>
          click
        </button>
      </form>
    );
  }
}

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ParamEditor params={mockParams} model={mockModel} />
  </StrictMode>
);
