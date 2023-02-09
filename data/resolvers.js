import { reject } from "lodash";
import { Widgets } from "./dbConnectors";

const resolvers = {
  getProduct: ({ id }) => {
    return new Promise((resolve) => {
      Widgets.findById({ _id: id }, (err, product) => {
        if (err) reject(err);
        else resolve(product);
      });
    });
  },
  getAllProducts: () => {
    return Widgets.find({});
  },
  createProduct: ({ input }) => {
    const newWidget = new Widgets({
      name: input.name,
      description: input.description,
      price: input.price,
      soldout: input.soldout,
      inventory: input.inventory,
      stores: input.stores,
    });

    console.log("newWidget._id;", newWidget._id);

    newWidget.id = newWidget._id;

    console.log("newWidget.id ", newWidget.id);

    return new Promise((resolve) => {
      newWidget.save((err) => {
        if (err) reject(err);
        else resolve(newWidget);
      });
    });
  },
  updateProduct: ({ input }) => {
    return new Promise((resolve) => {
      Widgets.findByIdAndUpdate(
        { _id: input.id },
        input,
        { new: true },
        (err, widget) => {
          if (err) reject(err);
          else resolve(widget);
        }
      );
    });
  },
  deleteProduct: ({ id }) => {
    return new Promise((resolve) => {
      Widgets.remove({ _id: id }, (err) => {
        if (err) reject(err);
        resolve("Successfully deleted widget");
      });
    });
  },
};

export default resolvers;
