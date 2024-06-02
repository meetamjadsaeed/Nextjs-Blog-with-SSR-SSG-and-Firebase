import axios from "axios";
import DOMPurify from "dompurify";
import Swal from "sweetalert2";
import PublicMedia from "../modules/shared/assets/images";

class ReUse {
  static emailRegExp =
    /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

  static phoneRegExp =
    /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;

  static defaultAvatar = ({ username = "John Doe" }) => {
    try {
      return `https://ui-avatars.com/api/?name=${username}&background=random&size=512`;
    } catch (err) {
      return "";
    }
  };

  static defaultThumbnailImage = ({ content = "No+Image+Available" }) => {
    try {
      return PublicMedia.Avatar;
    } catch (err) {
      return "";
    }
  };

  static resetForm = ({ fields = {} }) => {
    /**
     *  // fields is object
     *
     * Like fields = {
     * name: string
     * .....
     * }
     */

    const reset = Object.entries(fields).forEach(([key, value]) => {
      fields[key] = "";
    });
    return reset;
  };

  static resetErrors = ({ fields = {} }) => {
    /**
     *  // fields is object
     *
     * Like fields = {
     * name: string
     * .....
     * }
     */
    const reset = {};
    Object.keys(fields).forEach((key) => {
      reset[key] = "";
    });
    return reset;
  };

  static mapItems = (
    loading: boolean,
    data = [],
    Component: any,
    extraData: any,
    ...attributes: any
  ) => {
    function generateId(length = 9) {
      let result = "";
      let characters =
        "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
      let charactersLength = characters?.length;
      for (let i = 0; i < length; i++) {
        result += characters?.charAt(
          Math.floor(Math.random() * charactersLength)
        );
      }
      return result || "12ABCD";
    }

    try {
      if (loading) {
        return <LoaderForApi />;
      }

      if (Array.isArray(data) && data.length > 0) {
        return data.map((item, i) => (
          <Component
            key={generateId()}
            {...item}
            currentIndex={i}
            extraData={extraData}
          />
        ));
      }

      return "No record found";
    } catch (error) {
      return "No record found";
    }
  };

  static voidMapItems = (
    loading,
    data = [],
    Component,
    extraData,
    ...attributes
  ) => {
    function generateId(length = 9) {
      let result = "";
      let characters =
        "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
      let charactersLength = characters?.length;
      for (let i = 0; i < length; i++) {
        result += characters?.charAt(
          Math.floor(Math.random() * charactersLength)
        );
      }
      return result || "12ABCD";
    }

    try {
      if (loading) {
        return <LoaderForApi />;
      }

      if (Array.isArray(data) && data.length > 0) {
        return data.map((item, i) => (
          <Component
            key={generateId()}
            {...item}
            currentIndex={i}
            extraData={extraData}
          />
        ));
      }

      return null;
    } catch (error) {
      return null;
    }
  };

  static mapArray = (loading, data = [], Component, ...attributes) => {
    function generateId(length = 9) {
      let result = "";
      let characters =
        "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
      let charactersLength = characters?.length;
      for (let i = 0; i < length; i++) {
        result += characters?.charAt(
          Math.floor(Math.random() * charactersLength)
        );
      }
      return result || "12ABCD";
    }

    try {
      if (loading) {
        return <LoaderForApi />;
      }

      if (Array.isArray(data) && data.length > 0) {
        return data.map((item, i) => (
          <Component
            key={generateId()}
            {...attributes.reduce(
              (acc, attr) => ({ ...acc, [attr]: item }),
              {}
            )}
          />
        ));
      }

      return "No record found";
    } catch (error) {
      return "No record found";
    }
  };

  static loadObjBasedApiData = ({
    loading,
    data = "",
  }: {
    loading: boolean;
    data: string;
  }) => {
    if (loading) {
      return <LoaderForContent />;
    }
    if (typeof data === "string" || data instanceof String) {
      return data || "";
    }
    return "";
  };

  static onImageError = (e: any) => {
    const content = "No+Image+Available";
    const { target } = e ?? {};
    try {
      target.src = PublicMedia.Avatar;
    } catch (error) {
      target.src = "";
    }
  };

  static removeHTMLTags = ({ unStripped = "" }) => {
    if (typeof unStripped === "string" || unStripped instanceof String) {
      let stripped = unStripped?.replaceAll(/<\/?[^>]+(>|$)/gi, "");
      return stripped;
    }

    return unStripped;
  };

  static validateRequired = ({ fields }: { fields: any }) => {
    /**
     *
     * fields is object
     * example
     * 		const fields = {
     * 				email: "",
     * 				password: "",
     * 				// Add more fields as needed
     * 				};
     */

    const errors = {};

    for (const field in fields) {
      if (!fields[field]) {
        errors[field] = `${
          field.charAt(0).toUpperCase() + field.slice(1)
        } is required`;
      } else if (field?.toLowerCase() === "email") {
        const emailRegExp = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegExp.test(fields[field])) {
          errors[field] = "Please enter a valid email";
        }
      } else if (field?.toLowerCase() === "password") {
        if (fields[field].length < 6) {
          errors[field] = "Password must be at least 6 characters long";
        }
      } else if (
        field?.toLowerCase() === "phone" ||
        field?.toLowerCase() === "cellphone" ||
        field?.toLowerCase() === "cell_phone"
      ) {
        if (fields[field]?.length < 11) {
          errors[field] = "Phone number must be at least 11 digits long";
        }
        const phoneRegExp =
          /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/;
        // (123) 456-7890
        // (123)456-7890
        // 123-456-7890
        // 123.456.7890
        // 1234567890
        // +31636363634
        // 075-63546725
        if (!phoneRegExp.test(fields[field])) {
          errors[field] = "Please enter a valid number";
        }
      }
    }

    return errors;
  };

  static scrollToTop = () => {
    window.scrollTo({ top: 0 });
  };

  static handleFileUploads = (e: any) => {
    return new Promise((resolve, reject) => {
      try {
        const reader = new FileReader();
        const file = e.target.files[0];

        if (!file) {
          reject(new Error("No file selected."));
          return;
        }

        reader.onload = () => {
          const fileOutput = file;
          const fileUpload = reader.result;
          resolve({ fileOutput, fileUpload });
        };

        reader.onerror = (error) => {
          reject(error);
        };

        reader.readAsDataURL(file);
      } catch (error) {
        reject(error);
      }
    });
  };

  static handleMultipleImagesUpload = ({
    e,
    prevImages,
  }: {
    e: any;
    prevImages: any[];
  }) => {
    return new Promise((resolve, reject) => {
      try {
        if (e.target.files) {
          const filesArray = Array.from(e.target.files).map((file) =>
            URL.createObjectURL(file)
          );
          resolve([...prevImages, ...filesArray]);
          Array.from(e.target.files).forEach(
            (file) => URL.revokeObjectURL(file) // avoid memory leak
          );
        }
      } catch (error) {
        reject(error);
      }
    });
  };

  static dateFormat = ({ date = "" }) => {
    try {
      if (!date) {
        return "Invalid Date";
      }

      if (typeof date === "string" || date instanceof String) {
        return "Invalid Date";
      }

      const formatedDate = new Date(date).toLocaleDateString(undefined, {
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric",
      });

      return formatedDate;
    } catch (error) {
      return "Invalid Date";
    }
  };

  static formatTime = ({ timestamp = "" }) => {
    try {
      if (!timestamp) {
        return "Invalid Timestamp";
      }

      if (typeof timestamp !== "number") {
        return "Invalid Timestamp";
      }

      const totalSeconds = Math.floor(timestamp / 1000);
      const minutes = Math.floor(totalSeconds / 60);
      const seconds = totalSeconds % 60;
      const hours = Math.floor(minutes / 60);
      const remainingMinutes = minutes % 60;
      const days = Math.floor(hours / 24);
      const remainingHours = hours % 24;

      let formattedTime = "";

      // if (days > 0) {
      //   formattedTime += `${days} day${days > 1 ? "s" : ""} `;
      // }

      // if (remainingHours > 0) {
      //   formattedTime += `${remainingHours} hour${
      //     remainingHours > 1 ? "s" : ""
      //   } `;
      // }

      // if (remainingMinutes > 0 || (days === 0 && remainingHours === 0)) {
      //   formattedTime += `${remainingMinutes} minute${
      //     remainingMinutes > 1 ? "s" : ""
      //   } `;
      // }

      // if (
      //   seconds > 0 ||
      //   (days === 0 && remainingHours === 0 && remainingMinutes === 0)
      // ) {
      //   formattedTime += `${seconds} second${seconds > 1 ? "s" : ""}`;
      // }

      return hours + " " + " hours";
    } catch (error) {
      return "Invalid Timestamp";
    }
  };

  static logOutUser = () => {
    try {
      localStorage.clear();
      window.location.reload();
    } catch (error) {}
  };

  static getApiData = async (
    apiFunction,
    setApiData,
    setLoading,
    ...params
  ) => {
    setLoading(true);
    try {
      let apiResp = await apiFunction;
      const { message, response, posts } = apiResp?.data || {};
      setApiData(posts);
      setLoading(false);
    } catch (err) {
      setLoading(false);
    }
  };

  static getApiDataById = async (
    apiFunction,
    setApiData,
    setLoading,
    ...params
  ) => {
    setLoading(true);
    try {
      let apiResp = await apiFunction;
      const { message, response, data } = apiResp || {};
      setApiData(data);
      setLoading(false);
    } catch (err) {
      setLoading(false);
    }
  };

  static sortData = ({
    data = [],
    order,
    sortByProperty,
  }: {
    data: any[];
    order: number;
    sortByProperty: string;
  }) => {
    /**
     * data should be array of objects
     * order =1 ( for ascending)
     * order =2 ( for descending)
     * sortByProperty = property ( add property on the basis you want to sort data)
     *
     */

    if (!Array.isArray(data)) {
      return data;
    }

    if (![1, 2].includes(order)) {
      return data;
    }

    if (!sortByProperty || typeof sortByProperty !== "string") {
      return data;
    }

    const compareFunction = (a, b) => {
      const valA = a[sortByProperty];
      const valB = b[sortByProperty];

      if (valA === valB) {
        return 0;
      }

      if (order === 1) {
        return valA < valB ? -1 : 1;
      } else {
        return valA > valB ? -1 : 1;
      }
    };

    return [...data].sort(compareFunction);
  };

  static sliceText = ({ content = "", noOfWords = 3 }) => {
    if (typeof content === "string" || content instanceof String) {
      const words = content && content?.trim()?.split(/\s+/);
      return words?.slice(0, noOfWords)?.join(" ");
    }
    return content;
  };

  // static postApiHandler = async (
  // 	apiFunction,
  // 	fieldsData = {},
  // 	setLoading = false,
  // 	setAllErrors = {},
  // 	allErrors = {},
  // 	dispatch,
  // 	isAuth = false,
  // 	navigate,
  // 	navigatePath = "/",
  // ) => {
  // 	try {
  // 		setLoading(true);

  // 		// const { email, password } = fieldsData;
  // 		// const fields = { email, password };
  // 		const allErrors = ReUse.validateRequired(fieldsData);

  // 		// Check if there are any errors
  // 		if (Object.keys(allErrors).length > 0) {
  // 			setAllErrors(allErrors);
  // 			setLoading(false);
  // 			return;
  // 		}

  // 		let apiResp = await AppService.customerSignIn(fieldsData);
  // 		const { message, response } = apiResp?.data;

  // 		toast.success(message);

  // 		if (isAuth) {
  // 			dispatch(AuthActions.userAuthentication(response.data));
  // 		}
  // 		setLoading(false);
  // 		navigate(navigatePath);
  // 		ReUse.resetErrors(allErrors); // allErrors is an object
  // 		ReUse.resetForm(fieldsData); // fieldsData is an object
  // 	} catch (err) {
  // 		setLoading(false);
  // 		toast.error(err?.response?.data?.message);
  // 		ReUse.resetErrors(allErrors); // allErrors is an object
  // 		ReUse.resetForm(fieldsData); // fieldsData is an object
  // 	}
  // };

  // static dangerouslySetInnerHTML = (content = "") => {
  //   return (
  //     <p
  //       dangerouslySetInnerHTML={{
  //         __html: content,
  //       }}
  //     ></p>
  //   );
  // };

  // static dangerouslySetInnerHTML = (content = "") => {
  // 	if (!content || typeof content !== "string") {
  // 		return null; // Return null if content is missing or not a string
  // 	}

  // 	return (
  // 		<p
  // 			dangerouslySetInnerHTML={{
  // 				__html: content,
  // 			}}
  // 		></p>
  // 	);
  // };

  static dangerouslySetInnerHTML = ({ content = "" }) => {
    if (!content || typeof content !== "string") {
      return null; // Return null if content is missing or not a string
    }

    // Sanitize the HTML content using DOMPurify
    const sanitizedHTML = DOMPurify.sanitize(content);

    return <p dangerouslySetInnerHTML={{ __html: sanitizedHTML }}></p>;
  };

  static convertDollarToCents = ({ dollars = 0 }) => {
    var cents = dollars * 100;
    return cents;
  };

  static getInputFieldsData = ({
    e,
    setFieldsData,
    fieldsData,
  }: {
    e: any;
    setFieldsData: any;
    fieldsData: any;
  }) => {
    try {
      const { value, name } = e.target;

      if (!name || typeof value === "undefined") {
        setFieldsData({});
      }

      const updatedFieldsData = {
        ...fieldsData,
        [name]: value,
      };

      setFieldsData(updatedFieldsData);
    } catch (error) {
      setFieldsData({});
    }
  };

  static stripePaymentHandler = async ({
    fieldsData = {},
    stripePublishableKey = "",
  }) => {
    const { cardNumber, expiryDate, cvcNumber } = fieldsData;

    if (!cardNumber || !expiryDate || !cvcNumber) {
      return { isPaymentSuccess: false, data: {} };
    }

    const cardToken = {
      card: {
        number: cardNumber,
        exp_month: expiryDate.split("/")[0],
        exp_year: expiryDate.split("/")[1],
        cvc: cvcNumber,
      },
    };

    try {
      const response = await axios.post(
        `${process.env.REACT_APP_STRIPE_BASE_URL}/tokens`,
        cardToken,
        {
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
            Authorization: `Bearer ${stripePublishableKey}`,
          },
        }
      );

      return { isPaymentSuccess: true, data: response.data };
    } catch (err) {
      return { isPaymentSuccess: false, data: {} };
    }
  };

  static isValidCardNumber = ({ cardNumber }: { cardNumber: string }) => {
    // Remove any non-numeric characters from the card number
    const cleanedCardNumber = cardNumber.replace(/\D/g, "");

    if (!cleanedCardNumber || cleanedCardNumber.length !== 16) {
      return false; // Card number must be exactly 16 digits long
    }

    // Convert the card number to an array of digits
    const digits = cleanedCardNumber?.split("").map(Number);

    // Double every other digit starting from the second-to-last digit
    for (let i = digits.length - 2; i >= 0; i -= 2) {
      digits[i] *= 2;
      if (digits[i] > 9) {
        digits[i] -= 9; // If the result is greater than 9, subtract 9
      }
    }

    // Sum all the digits
    const sum = digits.reduce((acc, curr) => acc + curr, 0);

    // If the sum is divisible by 10, the card number is valid
    return sum % 10 === 0;
  };

  static isValidExpiryDate = ({ expiryDate }: { expiryDate: string }) => {
    const currentDate = new Date();
    const [expMonth, expYear] = expiryDate.split("/");
    const expirationDate = new Date(
      Number(`20${expYear}`),
      Number(expMonth) - 1
    );

    if (
      isNaN(expMonth) ||
      isNaN(expYear) ||
      expMonth.length !== 2 ||
      expYear.length !== 2
    ) {
      return false; // Invalid format
    }

    // Check if the expiration date is not in the past
    return expirationDate >= currentDate;
  };

  static isValidCVCNumber = ({ cvcNumber }: { cvcNumber: string }) => {
    const cleanedCvcNumber = cvcNumber.replace(/\D/g, ""); // Remove any non-numeric characters

    return cleanedCvcNumber.length === 3; // CVC number must be exactly 3 digits long
  };

  static extractIdFromCurrentUrl() {
    try {
      let currentUrl = window?.location?.href || "";
      const urlParts = currentUrl?.split("/");
      const id = urlParts[urlParts?.length - 1];

      if (!id) {
        return null;
      }

      return id;
    } catch (error) {
      return null;
    }
  }

  static isValueEmpty({ object = {} }) {
    let isValueEmpty = false;

    Object.entries(object).forEach(([key, value]) =>
      object[key] === "" ? (isValueEmpty = false) : (isValueEmpty = true)
    );

    return isValueEmpty;
  }

  static removeSpecialCharacterFromString({
    stringInput = "",
    characterToMatch = "",
  }) {
    const regExp = new RegExp(characterToMatch, "g");

    const stringWithoutSpecialCharacter = stringInput?.replace(regExp, "");

    return stringWithoutSpecialCharacter;
  }

  static isValidColor({ stringInput = "" }) {
    if (typeof stringInput !== "string") {
      return false;
    }

    // Regular expression to match valid hexadecimal color codes
    const colorRegex = /^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/;

    if (!colorRegex.test(stringInput)) {
      return false;
    }

    return true;
  }

  static isFound({ data = [], target = null || "" }) {
    return data.some(function (record) {
      return record.product_id === target;
    });
  }

  static calculateSubtotalPrice = ({ unitPrice = 0, quantity = 0 }) => {
    return quantity > 0 ? quantity * unitPrice : unitPrice;
  };

  static calculateTotalSubtotalPrice = ({ data = [] }) => {
    const subtotal = data.reduce((total, item) => {
      const quantity = item.qty || 1;
      return total + item.unit_price * quantity;
    }, 0);

    return subtotal;
  };

  static calculateTotalCost = ({ data = [], shippingCost = 0 }) => {
    const subtotal = data.reduce((total, item) => {
      const itemTotal =
        item.qty > 0 ? item.unit_price * item.qty : item.unit_price;
      return total + itemTotal;
    }, 0);

    const totalCost = subtotal + shippingCost;
    return totalCost;
  };

  static calculateTotalShipping = ({ data = [] }) => {
    const extractShippingCosts = data.map(
      ({ shippingCharges }) => shippingCharges || 0
    );
    const totalShippingCost = extractShippingCosts.reduce((a, b) => a + b, 0);
    return totalShippingCost;
  };

  static getStringProperties = ({ object = {} }) => {
    const result = {};

    for (let key in object) {
      if (typeof object[key] === "string") {
        result[key] = object[key];
      }
    }

    return result;
  };

  static mapObject = ({
    loading,
    data = {},
    Component,
    extraData,
  }: {
    loading: boolean;
    data: any;
    Component: any;
    extraData: any;
  }) => {
    function generateId(length = 9) {
      let result = "";
      let characters =
        "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
      let charactersLength = characters?.length;
      for (let i = 0; i < length; i++) {
        result += characters.charAt(
          Math.floor(Math.random() * charactersLength)
        );
      }
      return result || "12ABCD";
    }

    try {
      if (loading) {
        return <LoaderForApi />;
      }

      if (
        typeof data === "object" &&
        data !== null &&
        Object.keys(data).length > 0
      ) {
        return Object.keys(data).map(function (keyName, keyIndex) {
          return (
            <Component
              key={generateId()}
              {...data[keyName]}
              keyName={keyName}
              objectData={data}
              extraData={extraData}
              currentIndex={keyIndex}
            />
          );
        });
      }

      return "No record found";
    } catch (error) {
      return "No record found";
    }
  };

  static minifyArrayOfObjects = ({ data = [], key = "name" }) => {
    try {
      if (
        !Array.isArray(data) ||
        data.some((item) => typeof item !== "object")
      ) {
        return [];
      }

      const arrayUniqueByKey = [
        ...new Map(data?.map((item) => [item[key], item])).values(),
      ];

      const minifiedResult = arrayUniqueByKey?.map(
        ({ id: value, [key]: label }) => {
          return {
            value,
            label,
          };
        }
      );

      return minifiedResult;
    } catch (error) {
      return [];
    }
  };

  static foundRecord = ({
    data = [],
    property,
    target,
  }: {
    data: any[];
    property: string;
    target: string | number;
  }) => {
    const foundedRecord = data.find((record) => record[property] === target);
    return foundedRecord || {};
  };

  static filteredObj = ({ objectInput = {}, filteredKeys = [] }) => {
    const filteredObj = Object.keys(objectInput).reduce((acc, key) => {
      if (!filteredKeys.includes(key)) {
        acc[key] = objectInput[key];
      }
      return acc;
    }, {});

    return filteredObj;
  };

  static isArrayHasIndex = ({ arrayInput = [], index = 0 }) => {
    if (!Array.isArray(arrayInput)) {
      return false;
    }

    return arrayInput.length > index;
  };

  static isNumberOrText = ({ stringInput = "" }) => {
    return /^\d+(\.\d+)?$/.test(stringInput);
  };

  static addHyphenIfSpace = ({ word = "" }) => {
    if (word?.includes(" ")) {
      return word?.replace(/\s+/g, "-"); // Replace one or more spaces with a hyphen
    } else {
      return word?.trim(); // Remove leading and trailing spaces if there is only one word
    }
  };

  static extractDataByProperty = ({ data = [], propertyName = "" }) => {
    const extractedData = data?.map((item) => item[propertyName]);
    return extractedData || [];
  };

  static makeId = (length = 9) => {
    let result = "";
    let characters =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    let charactersLength = characters?.length;
    for (let i = 0; i < length; i++) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result || "12ABCD";
  };

  static isFile = ({ file = {} }) => {
    return Object.keys(file)?.length > 0;
  };

  static showConfirmationDialog = async ({
    title,
    text,
    confirmButtonText,
  }) => {
    title = title || "Are you sure?";
    text = text || "Once deleted, you will not be able to recover!";
    confirmButtonText = confirmButtonText || "Yes, delete it!";
    const { isConfirmed } = await Swal.fire({
      title,
      text,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: confirmButtonText,
    });

    return isConfirmed;
  };

  static showSuccessDialog = ({ text }: { text: string | String }) => {
    text = text || "Your record is safe!";
    Swal.fire("Success", text, "success");
  };

  static showErrorDialog = ({ text }: { text: string | String }) => {
    text = text || "Something went wrong!";
    Swal.fire("Error", text, "error");
  };

  static isString = ({ text }: { text: string | String }) => {
    return typeof text === "string" || text instanceof String ? true : false;
  };

  static calculatePercentage({
    currentValue,
    totalValue,
  }: {
    currentValue: number;
    totalValue: number;
  }) {
    return Math.floor((currentValue / totalValue) * 100);
  }

  static truncateDecimal({ number }) {
    // Check if the input is a number
    if (typeof number !== "number" || isNaN(number)) {
      // If it's not a number or it's NaN, return an error message or handle it accordingly
      return 0;
    }

    // Convert the number to a string
    var numberStr = number.toString();

    // Find the index of the decimal point
    var decimalIndex = numberStr.indexOf(".");

    if (decimalIndex !== -1) {
      // If decimal point exists, truncate the string to two decimal places
      var truncatedStr = numberStr.substring(0, decimalIndex + 3); // Include two digits after the decimal point

      // Convert the truncated string back to a float and return it
      return parseFloat(truncatedStr);
    } else {
      // If no decimal point exists, return the original number
      return number;
    }
  }

  static ordinal = (number) => {
    let suffix = undefined;

    if (10 <= number % 100 && number % 100 <= 20) {
      suffix = "th";
    } else {
      var lastDigit = number % 10;
      suffix = { 1: "st", 2: "nd", 3: "rd" }[lastDigit] || "th";
    }

    return number + suffix;
  };

  static padNumber = ({ number }) => {
    return number?.toString()?.padStart(2, "0");
  };
}

export default ReUse;
