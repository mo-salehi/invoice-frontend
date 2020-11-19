'use strict';





class LineItem extends React.Component {
  render() {
    return (
      <React.Fragment>
        {this.props.invoiceItem.map((invoiceItem) => (
          <tr key={invoiceItem.id}>
            <td>{invoiceItem.description}</td>
            <td>{invoiceItem.price}</td>
          </tr>
        ))}
      </React.Fragment>
    );
  }
}

class Invoice extends React.Component {
  state = {
    logoSrc: "/static/images/collectai_logo_green_bg.jpg",
    invoiceHeadInfo: {
      invoceNumber: "1566",
      createdAt: "17/07/2019",
      dueAt: "17/08/2019",
    },
    invoiceInfo: {
      email: "youknowit@star-wars-is-real.pew",
      fullName: "Bob Hans Jens, The Great ",
      company: "Acme, GmbH.",
    },
    invoiceItem: [
      { id: 1, description: "Death StarN", price: "$Crs 20.000.00.0000N" },
      { id: 2, description: "Death StarN2", price: "$Crs 30.000.00.0000N" },
      { id: 3, description: "Death StarN3", price: "$Crs 40.000.00.0000N" },
    ],
    apiData: [],
   
  };


  async componentDidMount() {
    const url = '/api/invoice.json';
    const response =  await fetch(url);
    const data = await response.json();
    this.setState({invoiceInfo:data});
    this.setState({invoiceItem:data.lineItems});
    this.setState({invoiceHeadInfo:data});
    
  }

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
                      <span>{this.state.invoiceHeadInfo.invoceNumber}</span>
                      <br />
                      Created:{" "}
                      <span>{this.state.invoiceHeadInfo.createdAt}</span>
                      <br />
                      Due: <span>{this.state.invoiceHeadInfo.dueAt}</span>
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
                      {this.state.invoiceInfo.company}
                      <br />
                      {this.state.invoiceInfo.fullName} <br />
                      {this.state.invoiceInfo.email}
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

          <LineItem invoiceItem={this.state.invoiceItem} />
          
          <tr className="total">
            <td></td>

            <td>Total: $385.00</td>
          </tr>
        </tbody>
      </table>
    );
  }
}

const domContainer = document.querySelector('#invoice');
ReactDOM.render(<Invoice/>, domContainer);
