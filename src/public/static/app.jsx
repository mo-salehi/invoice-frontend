"use strict";

class LineItem extends React.Component {
  render() {
    return (
      <React.Fragment>
        {this.props.lineItems.map((lineItems, i) => (
          <tr key={i}>
            <td>{lineItems.description}</td>
            <td>{lineItems.price}</td>
          </tr>
        ))}
      </React.Fragment>
    );
  }
}
class Invoice extends React.Component {
  state = {
    logoSrc: "/static/images/collectai_logo_green_bg.jpg",
    invoice: {
      email: "",
      fullName: "",
      company: "",
      id: "",
      createdAt: "",
      dueAt: "",
      lineItems: [{ description: "", price: "" }],
    },
    showAddLine: false,
    newDesc: "",
    newPrice: "",
  };
  componentDidMount() {
    fetch("/api/invoice.json")
      .then((response) => response.json())
      .then((invoice) => this.setState({ invoice }));
  }
  updateInputValue = (event) => {
    this.setState({ [event.target.name]: event.target.value });
  };
  cancelNewLine = () =>  {
    this.setState({showAddLine: false });
  };
  saveNewLine = () =>  {
    const invoice = this.state.invoice;
    const newLine = {description: this.state.newDesc, price: this.state.newPrice}
    invoice.lineItems.push(newLine);
    this.setState({ invoice, showAddLine: false, newDesc: "", newPrice: ""});
  };
  addNewLine = () => {
    this.setState({showAddLine: true });
  };
  render() {
    const logoStyle = {
      width: "100%",
      maxWidth: "300px",
    };
    return (
      <table cellPadding="0" cellSpacing="0">
        <tbody>
          <tr className="top">
            <td colSpan="2">
              <table>
                <tbody>
                  <tr>
                    <td className="title">
                      <img src={this.state.logoSrc} style={logoStyle} />
                    </td>
                    <td>
                      Invoice Nr.:
                      <span>{this.state.invoice.id}</span>
                      <br />
                      Created: <span>{this.state.invoice.createdAt}</span>
                      <br />
                      Due: <span>{this.state.invoice.dueAt}</span>
                    </td>
                  </tr>
                </tbody>
              </table>
            </td>
          </tr>
          <tr className="information">
            <td colSpan="2">
              <table>
                <tbody>
                  <tr>
                    <td>
                      CollectAI GmbH.
                      <br />
                      20457 Hamburg
                      <br />
                      Hamburg, Germany
                    </td>
                    <td>
                      {this.state.invoice.company}
                      <br />
                      {this.state.invoice.fullName}
                      <br />
                      {this.state.invoice.email}
                    </td>
                  </tr>
                </tbody>
              </table>
            </td>
          </tr>
          <tr className="heading">
            <td>Item</td>

            <td>Price</td>
          </tr>
          <LineItem lineItems={this.state.invoice.lineItems} />
          {this.newLineOpener()}
          <tr className="total">
            <td></td>
            <td>Total: $385.00</td>
          </tr>
        </tbody>
      </table>
    );
  }
  newLineOpener() {
    let showAddLine = this.state.showAddLine;
    if (showAddLine)
      return (
        <React.Fragment>
          <tr className="newLineForm">
            <td>
              <input
                name="newDesc"
                type="text"
                className="full-width"
                value={this.state.newDesc}
                onChange={this.updateInputValue}
              />
            </td>
            <td>
              <input
                name="newPrice"
                type="text"
                className="full-width"
                value={this.state.newPrice}
                onChange={this.updateInputValue}
              />
            </td>
          </tr>
          <tr className="newLineForm">
            <td>
              <button onClick={this.saveNewLine} className="button-primary">
                Save
              </button>
              <button onClick={this.cancelNewLine} className="button-primary">
                Cancel
              </button>
            </td>
            <td></td>
          </tr>
        </React.Fragment>
      );
    else
      return (
        <tr className="newLine">
          <td>
            <button onClick={this.addNewLine} className="button-primary">
              New Line
            </button>
          </td>
          <td></td>
        </tr>
      );
  };
}
const domContainer = document.querySelector("#invoice");
ReactDOM.render(<Invoice />, domContainer);
