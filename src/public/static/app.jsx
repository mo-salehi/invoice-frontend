"use strict";
//Test2
class Notification extends React.Component {
  render() {
    return (
      <tr className="notifications">
        <td colSpan="3">
          {this.props.notification.isActive ? (
            <p className={this.classChange()}>
              {this.props.notification.message}
            </p>
          ) : null}
        </td>
      </tr>
    );
  }
  classChange() {
    let messageClass = "message message-";
    messageClass +=
      this.props.notification.type === "error" ? "error" : "success";
    return messageClass;
  }
}

class LineItem extends React.Component {
  render() {
    return (
      <React.Fragment>
        {this.props.lineItems.map((lineItems, i) => (
          <tr key={i}>
            <td>{lineItems.description}</td>
            <td>{lineItems.price}</td>
            <td>
              <button
                onClick={() => this.props.onDelete(i)}
                className="button-cancel"
              >
                Delete
              </button>
            </td>
          </tr>
        ))}
      </React.Fragment>
    );
  }
}
class Invoice extends React.Component {
  state = {
    invoice: {
      email: "",
      fullName: "",
      company: "",
      id: "",
      createdAt: "",
      dueAt: "",
      lineItems: [{ description: "", price: 0.0 }],
    },
    showAddLine: false,
    newDesc: "",
    newPrice: "",
    notification: { message: "", isActive: false, type: "" },
  };
  componentDidMount() {
    fetch("/api/invoice.json")
      .then((response) => response.json())
      .then((invoice) => this.setState({ invoice }));
  }
  updateInputValue = (event) => {
    this.setState({ [event.target.name]: event.target.value });
  };
  cancelNewLine = () => {
    this.setState({ showAddLine: false });
  };
  saveNewLine = () => {
    const invoice = this.state.invoice;
    const newLine = {
      description: this.state.newDesc,
      price: parseFloat(this.state.newPrice),
    };
    const rx = /^\d{0,12}(\.\d{0,2})?$/;
    if (rx.test(newLine.price)) {
      invoice.lineItems.push(newLine);
      const notification = {
        message: "New item has been added",
        isActive: true,
        type: "success",
      };
      this.setState({
        notification,
        invoice,
        showAddLine: false,
        newDesc: "",
        newPrice: "",
      });
    } else {
      const notification = {
        message: "Invalid input: price should be a number",
        isActive: true,
        type: "error",
      };
      this.setState({ notification });
    }
  };
  addNewLine = () => {
    this.setState({ showAddLine: true });
  };
  deleteLine = (itemIndex) => {
    const invoice = this.state.invoice;
    const lineItems = invoice.lineItems;
    const remainLineItems = lineItems
      .slice(0, itemIndex)
      .concat(lineItems.slice(itemIndex + 1, lineItems.length));
    invoice.lineItems = remainLineItems;
    const notification = {
      message: "The item has been deleted",
      isActive: true,
      type: "success",
    };
    this.setState({ notification, invoice });
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
            <td colSpan="3">
              <table>
                <tbody>
                  <Notification notification={this.state.notification} />
                  <tr>
                    <td className="title">
                      <img
                        src="/static/images/collectai_logo_green_bg.jpg"
                        style={logoStyle}
                      />
                    </td>
                    <td>
                      Invoice Nr.:
                      <span>{this.state.invoice.id.substring(0, 10)}</span>
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
            <td colSpan="3">
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
                    <td colSpan="2">
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
            <td></td>
          </tr>
          <LineItem
            onDelete={this.deleteLine}
            lineItems={this.state.invoice.lineItems}
          />
          {this.newLineOpener()}
          <tr className="total">
            <td></td>
            <td colSpan="2">
              Total: $<span>{this.totalAmount()}</span>
            </td>
          </tr>
        </tbody>
      </table>
    );
  }

  totalAmount() {
    const lineItems = [...this.state.invoice.lineItems];
    const totalprice = parseFloat(
      lineItems.reduce((a, v) => (a = a + v.price), 0)
    ).toFixed(2);
    return totalprice;
  }
  newLineOpener() {
    let showAddLine = this.state.showAddLine;
    if (showAddLine)
      return (
        <tr className="newLineForm">
          <td>
            <input
              name="newDesc"
              type="text"
              className="full-width"
              placeholder="Description"
              value={this.state.newDesc}
              onChange={this.updateInputValue}
            />
          </td>
          <td>
            <input
              name="newPrice"
              type="text"
              className="full-width"
              maxLength={9}
              placeholder="Amount"
              type="text"
              value={this.state.newPrice}
              onChange={this.updateInputValue}
            />
          </td>
          <td className="lineButtons">
            <button onClick={this.saveNewLine} className="button-primary">
              Save
            </button>
            <button onClick={this.cancelNewLine} className="button-cancel">
              Cancel
            </button>
          </td>
        </tr>
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
  }
}
const domContainer = document.querySelector("#invoice");
ReactDOM.render(<Invoice />, domContainer);
