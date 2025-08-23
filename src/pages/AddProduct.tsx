
import React, { useState, useEffect, useRef} from "react";
import { resizeImageFile } from "../utils/imageUtils";
import inputUtils from "../utils/inputUtils";

import attributesOptions from "../data/attributesOptions";
import { Link } from "react-router-dom";


const MAX_IMAGE_WIDTH = 1200;
const MAX_IMAGE_HEIGHT = 1200;
const IMAGE_COMPRESSION_QUALITY = 0.8;
const OUTPUT_IMAGE_FORMAT = 'image/jpeg';



function AddProduct(){

  //////////////////////////////////////          FETCH CATETORIES ID/NAME          ////////////////////////////////////////

  interface Category{
    id: number;
    name: string;
  }

  const [categoriesData, setCategoriesData] = useState<Category[]>([])


  const fetchCategories = async () => {

    try {

      const jwtToken = localStorage.getItem('jwtToken');
      const backendUrl =`${import.meta.env.VITE_BACKEND_URL}/categories/get-categories-idname`;

      if(!jwtToken){
        console.error('No estas autenticado inicia sesion')
        return
      }

      const res = await fetch(backendUrl, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${jwtToken}`,
        },
      });

      const data  = await res.json();

      if (res.ok){
        console.log('se cargo las categorias con exito.');
        setCategoriesData(data.categories || []);
      }else{
        console.error('Fronted: Error del backend al obtener las categorias', data.error);
      }
    } catch(err){
      console.error('Frontend: Hubo un error de red o conexión al obtener las categorías:', err);
    }
  }

  useEffect(()=>{
    fetchCategories();
  }, []);


  ///////////////////////////////////      CHANGE OF FORMS       ///////////////////////////////////


  interface FormChange{
    status: 'productForm' | 'imagesForm' | 'chooseForm' | 'variantForm'
  }

  const [isStatus, setIsStatus] =  useState<FormChange>({status: 'productForm'});


  ////////////////////////////////////////////////            ADD PRODUCT            ////////////////////////////////////////////////

  interface Product{

    productName: string;
    description: string;
    status: string;
    category_id: string;
    category_name: string;

    product_id: number;
    //sku_code
    price: string;
    stock: string;
    is_default: boolean;

    variant_id: number;
    attribute_name: string[];
    attribute_value: string[];
    display_value: string[];
    display_type: string[];
    is_filterable: boolean[];
    sort_order: (string|number)[];
    abrev: string[];

  }

  const [productData, setProductData] = useState<Product>({

    productName: '',
    description: '',
    status: 'active',
    category_id: '',
    category_name: '',

    product_id: 0,
    //sku_code
    price: '',
    stock: '',
    is_default: true,

    variant_id: 0,
    attribute_name: [],
    attribute_value: [],
    display_value: [],
    display_type: [],
    is_filterable: [],
    sort_order: [],
    abrev: [],

  })

  //////////////////////////////////////////        HANDLE CHANGE PRODUCT        //////////////////////////////////////////////

  const getCateName = (id:number) => {
    const category = categoriesData.find(cat => cat.id === id);
    return category ? category.name : 'Categoria no encontrada'
  }
  const handleChangeProduct = (e: React.ChangeEvent<HTMLInputElement| HTMLSelectElement | HTMLTextAreaElement>) => {
    const {name, value, } = e.target;

    if(name === 'category_id'){
      setProductData(prev => ({
      ...prev,
      [name]: value,
      }));

      const cateName = getCateName(parseInt(value));
      setProductData(prev => ({
      ...prev,
      ['category_name']: cateName,
      }));
    }


    if(name === 'price'){
      const newValue: string = inputUtils.validatePriceInput(value);
      setProductData(prev => ({
        ...prev,
        [name]: newValue
      }))
    } else if (name === 'stock'){
        const newValue: string = inputUtils.validateStockInput(value);
        setProductData(prev => ({
          ...prev,
          [name]: newValue
        }))
      }else{
      setProductData(prev => ({
      ...prev,
      [name]: value,
      }));
    }
  }


  const handleChangeProductarray = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>,
    index: number,
    display?: string,
    order?: number,
    abrev?: string,
  ) => {


    const { name, value} = e.target ;

    if(productData.attribute_name.includes(value)){
      return
    }

    ////  display_type and is_filterable  //////

    if (name === 'attribute_name'){

      const displayType = e.target.selectedOptions[0].getAttribute('data-display-type');
      const newName = 'display_type'

      setProductData(prev => {

      const targetArray = prev[newName as keyof Product] as string[];
      const updatedArray = [...targetArray];
      updatedArray[index] = displayType;

      return {
        ...prev,
        [newName]: updatedArray,
      };
      });

      const isFilterable = 'is_filterable';
      let filterable: boolean;

      if(value === 'color'){
        filterable = true;
        setProductData(prev => {
        const targetArray = prev[isFilterable as keyof Product] as boolean[];
        const updatedArray = [...targetArray];
        updatedArray[index] = filterable;
        return {
          ...prev,
          [isFilterable]: updatedArray,
        };
        })
      }else{

        filterable = false;
        setProductData(prev => {
        const targetArray = prev[isFilterable as keyof Product] as boolean[];
        const updatedArray = [...targetArray];
        updatedArray[index] = filterable;
        return {
          ...prev,
          [isFilterable]: updatedArray,
        };
        })
      }
    }

    //// display_value sort_order and abrev  /////

    if(display && order && abrev){

      const newName = 'display_value';
      const orderName = 'sort_order';
      const abrevation = 'abrev'

      setProductData(prev => {
      const targetArray = prev[newName as keyof Product] as string[];

      const updatedArray = [...targetArray];
      updatedArray[index] = display;

      return {
        ...prev,
        [newName]: updatedArray,
      };
      });

      setProductData(prev => {
      const targetArray = prev[orderName as keyof Product] as number[];

      const updatedArray = [...targetArray];
      updatedArray[index] = order;

      return {
        ...prev,
        [orderName]: updatedArray,
      };
      });

      setProductData(prev => {
      const targetArray = prev[abrevation as keyof Product] as string[];

      const updatedArray = [...targetArray];
      updatedArray[index] = abrev;

      return {
        ...prev,
        [abrevation]: updatedArray,
      };
      });
    }

      setProductData(prev => {
      // TypeScript necesita un poco de ayuda aquí para saber que prev[name] es un array.
      // Usamos un cast a `any[]` para permitir el acceso por índice y el spread.

      const targetArray = prev[name as keyof Product] as string|boolean[];

      // Crea una COPIA del array y actualiza el elemento en el índice dado
      const updatedArray = [...targetArray];
      updatedArray[index] = value;

      return {
        ...prev,
        [name]: updatedArray, // Asigna el array modificado de nuevo al estado
      };
      });

  };


  ////////////////////////////     SKU_CODE FUNCION       ///////////////////////////

  function sku_code(
    /* esta funcion crea un stock keeping unit sku code unico para cada variante de porducto */
    productId: number,
    categoryName: string,
    productName: string,
    attributeAbrevs: string[]
  ) {
    if(!productId){
      return
    }
    if(!categoryName){
      return
    }
    if(!productName){
      return
    }
    if(!attributeAbrevs){
      return
    }

    const nameAbrev = (productName: string) => {
      /* Devuelve algunas caracteristicas de forma abreviada del nombre */
      const foundItem = attributesOptions.productAbreviations.find(item => {
        const key = Object.keys(item)[0];
        return productName.toLowerCase().includes(key);
      });
      return foundItem ? Object.values(foundItem)[0] : undefined;
      };


    const genreAbrevFunction = (productName: string) => {
      /* Devuelve el nombre de los generos de forma abreviada*/
      const foundItem = attributesOptions.genreAbreviations.find(item => {
        const key = Object.keys(item)[0];
        return productName.toLowerCase().includes(key);
      });
      return foundItem ? Object.values(foundItem)[0] : undefined
    }

    const formattedId = productId.toString().padStart(4, '0');
    const categoryAbrev = categoryName.slice(0,1).toLocaleUpperCase();
    const productNameAbrev = nameAbrev(productName);
    const genreAbrev = genreAbrevFunction(productName);
    const attributeAbrev = attributeAbrevs.join('-');


    let sku_code;
    if(genreAbrev){
      sku_code = `${categoryAbrev}-${productNameAbrev}-${genreAbrev}-${attributeAbrev.toUpperCase()}-${formattedId}`;
      return sku_code;
    }else{
      sku_code = `${categoryAbrev}-${productNameAbrev}-${attributeAbrev.toUpperCase()}-${formattedId}`;
      return sku_code;
    }

  }

  //////////////////////////////////////////      PRODUCT SUBMIT       ///////////////////////////////////////////////////


  const handleSubmitProduct = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const jwtToken = localStorage.getItem('jwtToken');

    if (!jwtToken){
        console.error('No tienes permiso');
        return
      }

    try {

      /////////////////     SENT PARENT PRODUCT      ////////////////

      const product = {
        name: productData.productName,
        description: productData.description,
        status: productData.status,
        category_id: parseInt(productData.category_id),
      };

      const backendUrl = `${import.meta.env.VITE_BACKEND_URL}/products/add-product`;

      const res = await fetch(backendUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${jwtToken}`
        },
        body: JSON.stringify(product),
      });

      const data = await res.json();

      if (res.ok){
        const newProductId = data.product_id;
        setProductData(prev => ({
        ...prev,
        ['product_id']: newProductId,
        }));

        console.log(data.message);


        ////////////////     SENT PRODUCT VARIANT      ///////////////


        const skuCode = sku_code(
          newProductId,
          productData.category_name,
          productData.productName,
          productData.abrev,
        )

        const productVariant = {
          product_id : newProductId,
          sku_code : skuCode,
          price : Number(productData.price),
          stock : parseInt(productData.stock),
          is_default : productData.is_default
        }
        const backendUrl2 = `${import.meta.env.VITE_BACKEND_URL}/products/add-product-variant`;

        const variantRes = await fetch(backendUrl2, {
          method: 'POST',
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${jwtToken}`
          },
          body: JSON.stringify(productVariant),
        })

        const variantData = await variantRes.json();


        if(variantRes.ok){
          const newVariantId = variantData.variant_id;
          setProductData(prev => ({
            ...prev,
            ['variant_id']: newVariantId,
          }));

          console.log(variantData.message)

          /////////////////       SENT ATTRIBUTES         /////////////////


          for (let i = 0; i < productData.attribute_name.length; i++){

            const attributes = {
              variant_id : newVariantId,
              attribute_name : productData.attribute_name[i],
              attribute_value : productData.attribute_value[i],
              display_value : productData.display_value[i],
              display_type : productData.display_type[i],
              is_filterable : productData.is_filterable[i],
              sort_order : productData.sort_order[i],
            }

            const backendUrl = `${import.meta.env.VITE_BACKEND_URL}/products/add-attribute`;

            const res = await fetch(backendUrl, {
              method: 'POST',
              headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${jwtToken}`
              },
              body: JSON.stringify(attributes),
            })

            const data = await res.json()

            if(res.ok){
              console.log(data.message)
            }else {
              console.log(console.error)
            }
          }

          setIsStatus(() => ({
            ['status']: 'imagesForm'
          }))

          console.log(productData)

        }else {
          console.log(variantData.error);
        }

      }else{
        console.error(data.error)
      }

    }catch(error){
      console.error(error)
    }
  }



  /////////////////////////////////////////          HANDLE VARIANT SUBMIT        ////////////////////////////////////////////////
  const handleSubmitVariant = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    try {

      const jwtToken = localStorage.getItem('jwtToken')
      if (!jwtToken){
        console.log('No tienes autorizacion para realizar esto.')
        return
      }

      const skuCode = sku_code(
        productData.product_id,
        productData.category_name,
        productData.productName,
        productData.abrev,
      )

      const productVariant = {
        product_id : productData.product_id,
        sku_code: skuCode,
        price: Number(productData.price),
        stock: parseInt(productData.stock),
        is_default: productData.is_default,
      }

      const backendUrl = `${import.meta.env.VITE_BACKEND_URL}/products/add-product-variant`;

      const variantRes = await fetch(backendUrl, {
        method: 'POST',
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${jwtToken}`
        },
        body: JSON.stringify(productVariant),
      })

      const variantData = await variantRes.json();

      if(variantRes.ok){
        const variantId = variantData.variant_id;
        setProductData(prev => ({
          ...prev,
          ['variant_id']: variantId
        }));
        console.log(variantData.message);

        ////////  Sent Attributes  ////////

        for(let i = 0; i < productData.attribute_name.length; i++){

          const attributes = {
          variant_id: variantId,
          attribute_name: productData.attribute_name[i],
          attribute_value: productData.attribute_value[i],
          display_value: productData.display_value[i],
          display_type: productData.display_type[i],
          is_filterable: productData.is_filterable[i],
          sort_order: productData.sort_order[i],
          }

          const backendUrl = `${import.meta.env.VITE_BACKEND_URL}/products/add-attribute`;

          const attributeRes = await fetch(backendUrl, {
            method: "POST",
            headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${jwtToken}`
            },
            body: JSON.stringify(attributes),
          })

          const data = await attributeRes.json();

          if (attributeRes.ok){
            console.log(data.message);
          }else{
            console.error(data.error);
          }
        }

        console.log(productData);
        setIsStatus(() => ({
          ['status']: 'imagesForm'
        }));

      }else{
        console.error(variantData.error)
      }

    } catch(error){
      console.log(error)
    }

  }


  /////////////////////////////////////    ADD VARIANT BUTTON   //////////////////////////////////

  const addVariant = () => {
    removeVariantData();
    setIsStatus(() => ({
      ['status']: 'variantForm'
    }));
  }

  const addProduct = () => {
    removeProductData();
    setProductData(prev => ({
      ...prev,
      ['is_default']: true
    }));
    setIsStatus(()=> ({
      ['status']: 'productForm'
    }));
  }

  ///////////////////////////////////////////////////       ADD VARIANT ATTRIBUTE BUTTON      ///////////////////////////////////////////////////////////

  const [attributeFormNum, setAttributeFormNum] = useState<number[]>([1]);

  const addAttributeFormFunction = () => {
    if(attributeFormNum.length < 2){
      setAttributeFormNum(prevAttributeFormNum => [...prevAttributeFormNum, 1]);
    }
  }

  ////////  quitar attributo boton  ////////

  const itemsToRemoveStr: Array<keyof Product> = ['attribute_name', 'attribute_value', 'display_type', 'display_value', 'abrev', 'is_filterable', 'sort_order'];
  const removeAttributeButton = () => {
  setProductData(prev => {
    const updatedData = { ...prev };

    itemsToRemoveStr.forEach(name => {
      if (Array.isArray(updatedData[name])) {
        // Elimina el segundo elemento (índice 1)
        updatedData[name] = updatedData[name].filter((_, index) => index !== 1);

      }
    });

    setAttributeFormNum(attributeFormNum.slice(0,1))
    return updatedData;

  });

};


  const removeProductData = () => {
    removeVariantData()
    setProductData(prev => ({
      ...prev,
      ['product_id']: 0,
      ['productName']: '',
      ['description']: '',
      ['status']: 'active',
      ['category_id']: '',
      ['category_name']: '',
    }))
  }


  const removeVariantData = () => {
    setProductData(prev => ({
      ...prev,
      ['variant_id']: 0,
      ['price']: '',
      ['stock']: '',
      ['is_default']: false,
      ['attribute_name']: [],
      ['attribute_value']: [],
      ['display_value']: [],
      ['display_type']: [],
      ['is_filterable']: [],
      ['sort_order']: [],
      ['abrev']: [],
    }))
  }


  ////////////////////////////////////////////////////       HANDLE PRODUCT IMAGES       /////////////////////////////////////////////////////////////


  ////   Datos  /////

  interface VariantImageData {
    variant_id: number;
    is_primary: boolean;
  }

  interface VariantImagesData {
    imageData?: VariantImageData;
    imagesData: VariantImageData[];
  }

  const [dataImgData, setDataImgData] = useState<VariantImagesData>({
    imagesData: []
  })

  //console.log(dataImgData.imageData);
  //console.log(dataImgData.imagesData);

  /////   files   /////
  interface VariantImageFile {
    img: File
  }

  interface VariantImagesFiles {
    imageFile?: VariantImageFile;
    imagesFiles: VariantImageFile[];
  }

  const [dataImgFiles, setDataImgFiles] = useState<VariantImagesFiles>({
    imagesFiles: []
  })

  /////////    image urls     ////////////

  interface VariantImagesUrl {
    primaryImg: string;
    secundaryImg: string[];
  }

  const [dataUrl, setDataUrl] = useState<VariantImagesUrl>({
    primaryImg : '',
    secundaryImg: [],
  })


  /////// handle change primary image ///////

  const handleChangePrimaryImg = async (e:React.ChangeEvent<HTMLInputElement>) => {
    const {name} = e.target
    const file = e.target.files?.[0]


    if (file){

      /// datos ////

      const imgData:VariantImageData = {
      variant_id: productData.variant_id,
      is_primary: true
      }

      setDataImgData(prev => ({
        ...prev,
        ['imageData']: imgData
      }));


       /// resize function ///

      const resizeFile =  await resizeImageFile(
        file,
        MAX_IMAGE_WIDTH,
        MAX_IMAGE_HEIGHT,
        IMAGE_COMPRESSION_QUALITY,
        OUTPUT_IMAGE_FORMAT,
      )

        //////  url change   ///////

      if(resizeFile){
        const url = URL.createObjectURL(resizeFile)
        setDataUrl(prev => ({
          ...prev,
          [name]: url
        }))

        /////  file  change  /////

        const fileImg: VariantImageFile = {
          img: resizeFile
        }
        setDataImgFiles(prev => ({
        ...prev,
        ['imageFile']: fileImg
        }))
      }
    }
  }

  /////  remove main image   //////

  const fileInputRef = useRef<HTMLInputElement>(null)

  const removePrimaryImg = () =>{

    /// url ///

    const urlToDelete = dataUrl.primaryImg;
    if (urlToDelete){
      URL.revokeObjectURL(urlToDelete)
      setDataUrl(prev => ({
      ...prev,
      primaryImg: ''
      }));
    }

    /// datos  ///
    setDataImgData(prev => ({
      ...prev,
      ['imageData']: undefined
    }))


    /// files ///
    setDataImgFiles(prev => ({
      ...prev,
      ['imageFile']: undefined
    }));



    if (fileInputRef.current){
      fileInputRef.current.value = '';
    }

  };


  ///// handle change secundary images //////

  const handleChangeSecundaryImg = async (e:React.ChangeEvent<HTMLInputElement>) => {
    const {name} = e.target
    const file = e.target.files?.[0]

    if (file){

      ///// datos ////

      const imgData:VariantImageData = {
      variant_id: productData.variant_id,
      is_primary: false
      }

      setDataImgData(prev => ({
        ...prev,
        ['imagesData']: [...prev.imagesData, imgData]
      }))

      ////   resize function  ////
      const resizeFile =  await resizeImageFile(
        file,
        MAX_IMAGE_WIDTH,
        MAX_IMAGE_HEIGHT,
        IMAGE_COMPRESSION_QUALITY,
        OUTPUT_IMAGE_FORMAT,
      )

      ////// url change //////

      if(resizeFile){
        const url = URL.createObjectURL(resizeFile)
        setDataUrl(prev => ({
          ...prev,
          [name]: [...prev.secundaryImg, url]
        }))

        //// file change  ///

        const imgFile:VariantImageFile = {
          img: resizeFile,
        }

        setDataImgFiles(prev => ({
          ...prev,
          imagesFiles: [...prev.imagesFiles, imgFile]
        }))

      }
    }

    console.log(dataImgData)
    console.log(dataImgFiles)
  }

  /////  remove secundary images   //////

  const removeSecundaryImg = (
    index:number
    ) => {

    /// url ///
    const urlToDelete = dataUrl.secundaryImg[index];
    if (urlToDelete){
      URL.revokeObjectURL(urlToDelete)
      setDataUrl(prev => ({
      ...prev,
      secundaryImg: prev.secundaryImg.filter((_, i) => i !== index)
      }));
    }

    /// datos ///
    setDataImgData(prev => ({
      ...prev,
      imagesData: prev.imagesData.filter((_, i) => i !== index)
    }))


    /// files ///
    setDataImgFiles(prev => ({
      ...prev,
      imagesFiles: prev.imagesFiles.filter((_, i) => i !== index)
    }));


    if (fileInputRef.current){
      fileInputRef.current.value = '';
    }

  };


  const removeAll = () =>{
    removePrimaryImg()
    for (let i = dataImgFiles.imagesFiles.length - 1; i >= 0; i--){
      console.log(dataImgFiles.imagesFiles.length)
      removeSecundaryImg(i)
    }
  }


  ///////////////////////////////////////////////             HANDLE SUBMIT  IMAGES               /////////////////////////////////////////////
  const handleSubmitImages = async(e:React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    console.log(productData)

    let newDataImgData;
    let newDataImgFiles;

    if (dataImgData.imageData){
      newDataImgData = dataImgData.imagesData
      newDataImgData.push(dataImgData.imageData)
      console.log(newDataImgData)
    }else{
      return
    }

    if (dataImgFiles.imageFile){
      newDataImgFiles = dataImgFiles.imagesFiles
      newDataImgFiles.push(dataImgFiles.imageFile)
      console.log(newDataImgFiles)
    }else{
      return
    }


    try{
      const jwtToken = localStorage.getItem('jwtToken')
      if (!jwtToken){
        console.error('No estas autorizado')
        return
      }


      const formData = new FormData();
      let filesCount = 0;

      for (let i = 0; i < newDataImgFiles.length; i++){
        const fileContainer = newDataImgFiles[i];
        const imageData = newDataImgData[i];

        if (fileContainer && fileContainer.img instanceof File && imageData) {
          formData.append('files', fileContainer.img);
          formData.append(`metadata[${i}]`, JSON.stringify(imageData));
          filesCount += 1;
        }
      }

      if (filesCount === 0){
        console.warn('Fronted: No hay imagenes seleccionadas para subir.')
        return
      }


      const backendUrl = `${import.meta.env.VITE_BACKEND_URL}/products/add-product-images`;
      const res = await fetch(backendUrl, {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${jwtToken}`
        },
        body: formData,
      });

      const data = await res.json();

      if (res.ok) {
        removeAll();
        console.log("Frontend: Imagenes subidas y asociadas con exito", data.message);
        console.log(productData)
        setIsStatus(() => ({
          ['status']: 'chooseForm'
        }));
      }else {
        console.error('Frontend: Error alsubir las imagenes',data.error)
      }

    }catch(error){
      console.error('hubo un error al agregar las imagenes', error)
    }
  }



  ///////////////////////////////////////////////////////////////////       FORMS       /////////////////////////////////////////////////////////////////////////////////


  return (

    <div className="flex justify-center items-center min-h-screen bg-gray-100 p-4">

      {isStatus.status === 'imagesForm' ? (

        <div className="flex flex-col items-center px-4 py-3 w-full max-w-md shadow-lg bg-white border-2 border-red-600 rounded-lg">
          <h2 className="text-lg font-bold text-center text-black mb-3">{productData.productName}</h2>
          <form
            onSubmit={handleSubmitImages}
            className="space-y-3 flex flex-col items-center w-full max-w-80">
            <p
              className="text-base font-bold text-black mb-4 pb-2 border-b border-gray-400"
            >Imagen Principal
            </p>

            {dataUrl.primaryImg ? (
              <div className="relative w-36 h-36 mx-auto rounded-lg overflow-hidden border-2 border-red-600 shadow-md group">
                <img
                  src={dataUrl.primaryImg}
                  alt="Previsualización de Imagen Principal"
                  className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                />
                <button
                  type="button"
                  className="absolute top-2 right-2 bg-black text-white rounded-full p-1 w-8 h-8 flex items-center justify-center text-sm font-bold opacity-0 group-hover:opacity-100 transition-opacity duration-300 transform hover:scale-110"
                  onClick={removePrimaryImg}
                  title="Eliminar Imagen pricipal"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                  </svg>
                </button>
              </div>
            ) : (
              <div
                className="relative w-36 h-36 mx-auto border-2 border-dashed border-red-600 rounded-lg flex items-center justify-center hover:border-black transition-colors duration-200 cursor-pointer"
              >
                <label
                  htmlFor="mainImage"
                  className="absolute inset-0 flex items-center justify-center text-red-600 hover:text-black text-6xl font-light cursor-pointer"
                >+
                </label>
                <input
                  type="file"
                  accept="image/*"
                  id="mainImage"
                  name="primaryImg"
                  onChange={handleChangePrimaryImg}
                  ref={fileInputRef}
                  className="inset-0 hidden opacity-1 cursor-pointer"
                />
              </div>
            )}
            <p
              className="text-sm font-semibold text-black mb-4 pb-2 border-b border-gray-400"
            >Más Imágenes
            </p>
            <div
              className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-2 gap-4"
            >
              {Array.from({length:4}).map((_, index) => (
                <div key={index} className="relative w-28 h-32 border-2 border-dashed border-red-600 rounded-lg flex items-center justify-center overflow-hidden hover:border-red-600 transition-colors duration-200 group">
                  {dataUrl.secundaryImg[index] ? (
                    <>
                      <img
                        src={dataUrl.secundaryImg[index]}
                        alt={`Previsualización de imagen secundaria ${index + 1}`}
                        className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                      />
                      <button
                        type="button"
                        className="absolute top-2 right-2 bg-black text-white rounded-full p-1 w-6 h-6 flex items-center justify-center text-xs font-bold opacity-0 group-hover:opacity-100 transition-opacity duration-300 transform hover:scale-110"
                        onClick={() => removeSecundaryImg(index)}
                        title={`Eliminar imagen secundaria ${index + 1}`}
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                          <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                        </svg>
                      </button>
                    </>
                  ):(
                    <>
                      <label
                        key={`label${index}`}
                        htmlFor={`secundaryImg${index}`}
                        className="absolute inset-0 flex items-center justify-center text-red-600 hover:text-black text-5xl font-light cursor-pointer"
                      >+
                      </label>
                      <input
                        key={`input${index}`}
                        type="file"
                        accept="image/*"
                        id={`secundaryImg${index}`}
                        name={`secundaryImg`}
                        onChange={handleChangeSecundaryImg}
                        className="absolute inset-0 opacity-0 cursor-pointer"
                      />
                    </>
                  )}
                </div>
              ))}
            </div>
            <button
              type="submit"
              className="w-fit text-white text-base font-bold py-2 px-4 bg-red-600 rounded-md hover:bg-black focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
            >Enviar
            </button>
          </form>
        </div>

      ): isStatus.status === 'productForm' ? (

        <div className="flex flex-col items-center bg-white p-4 rounded-lg shadow-lg border-2 border-red-600 w-full max-w-xl">

          <h1 className="text-2xl font-bold text-center text-black mb-6">Añadir Producto</h1>
          <form onSubmit={handleSubmitProduct} className="space-y-2 w-full max-w-md">

            <label
              htmlFor="productName"
              className="block text-sm font-medium text-black mb-1"
              >Nombre del Producto:
            </label>
            <input
              type="text"
              id="productName"
              name="productName"
              value={productData.productName}
              onChange={(e)=>handleChangeProduct(e)}
              className="w-full px-3 py-2 border border-gray-400 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
            />

            <label
              htmlFor="productCategory"
              className="block text-sm font-medium text-black mb-1"
              >Category:
            </label>

            <select
              name="category_id"
              id="productCategory"
              value={productData.category_id}
              onChange={handleChangeProduct}
              className="w-full px-3 py-2 border border-gray-400 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
              >
                <option value="">-</option>
                {categoriesData.map((category) => (
                  <option
                  key={category.id}
                  value={category.id}
                  >{category.name}
                  </option>
                ))}
            </select>

            <label
              htmlFor="selectStatus"
              className="block text-sm font-medium text-black mb-1"
              >Status:
            </label>

            <select
              name="status"
              id="selectStatus"
              className="w-full px-3 py-2 border border-gray-400 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
              value={productData.status}
              onChange={handleChangeProduct}
              >
                <option value="active">active</option>
                <option value="draft">draft</option>
            </select>

            <label
              htmlFor="price"
              className="block text-sm font-medium text-black mb-1"
            >Precio:
            </label>
            <input
              id="price"
              name="price"
              type="text" inputMode="decimal"
              value={productData.price}
              placeholder="0.00"
              onChange={handleChangeProduct}
              className="w-full px-3 py-2 border border-gray-400 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
            />

            <label
              htmlFor="stock"
              className="block text-sm font-medium text-black mb-1"
            >Cantidad en stock:
            </label>

            <input
              id="stock"
              name="stock"
              type="text" inputMode="decimal"
              placeholder="0"
              value={productData.stock}
              onChange={handleChangeProduct}
              className="w-full px-3 py-2 border border-gray-400 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
            />

            {attributeFormNum.map((_, index) => (
              <div key={index} className="flex flex-col items-center">
                <label
                  htmlFor="attributeName"
                  className="block text-sm font-medium text-black mb-1"
                >Atributo:
                </label>

                <select
                  id="attributeName"
                  name="attribute_name"
                  value={productData.attribute_name[index]}
                  onChange={(e)=> handleChangeProductarray(e,index)}
                  className="w-full px-3 py-2 border border-gray-400 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
                  >
                    <option value="">-</option>
                    {attributesOptions.attributeNames.map((attribute) => (
                      <option
                        key={attribute.value}
                        value={attribute.value}
                        data-display-type={attribute.display_type}
                      >{attribute.name}
                      </option>
                    ))}
                </select>

                {productData.attribute_name[index] === 'color' ? (

                  <div className="mb-4 max-w-md flex flex-col items-center">
                    <label
                      className="block text-sm font-medium text-black mb-2">
                      Seleccionar Color:
                    </label>
                    <div className="flex flex-wrap justify-center gap-2">
                      {attributesOptions.colorOptions.map((color) => (
                        <label
                          key={color.value}
                          htmlFor={`color-${color.value}-${index}`}
                          className={`relative w-8 h-7 rounded-full border-2 cursor-pointer
                                      ${productData.attribute_value[index] === color.value ? 'border-red-500 ring-2 ring-red-500' : 'border-gray-400'}
                                      hover:border-black transition-all duration-150 ease-in-out`}
                          style={{ backgroundColor: color.display_value}}
                          title={color.label}
                        >
                          <input
                            type="radio"
                            id={`color-${color.value}-${index}`}
                            name='attribute_value'
                            value={color.value}
                            onChange={(e) => handleChangeProductarray(e,index, color.display_value, color.order, color.abrev)}
                            className="hidden"
                          />
                          {productData.attribute_value[index] === color.value && (
                            <div className="absolute inset-0 flex items-center justify-center text-white">
                              <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                              </svg>
                            </div>
                          )}
                        </label>
                      ))}
                    </div>
                  </div>


                ) : productData.attribute_name[index] === 'talla-ropa-general' ?  (
                  <div className="mb-4 max-w-md flex flex-col items-center">
                    <label
                      className="block text-sm font-medium text-black mb-2">
                      Seleccionar Talla:
                    </label>
                    <div className="flex flex-wrap justify-center gap-2">
                      {attributesOptions.tallaGeneralOptions.map((talla) => (
                        <label
                          htmlFor={`talla-${talla.value}-${index}`}
                          key={talla.value}
                          className={`relative w-14 h-7 rounded-full border-2 cursor-pointer
                                      ${productData.attribute_value[index] === talla.value ? 'border-red-500 ring-2 ring-red-500' : 'border-gray-400'}
                                      hover:border-black transition-all duration-150 ease-in-out text-center`}
                          title={talla.display_value}
                          style={{fontWeight: "bold", color: 'black', fontSize: '14px'}}

                        >{talla.label}
                          <input
                            id={`talla-${talla.value}-${index}`}
                            name="attribute_value"
                            type="radio"
                            value={talla.value}
                            onChange={(e)=> handleChangeProductarray(e, index, talla.label, talla.order, talla.value)}
                            className="hidden"
                          />
                          {productData.attribute_value[index] === talla.value && (
                            <div className="absolute inset-0 flex items-center justify-center text-white">
                              <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                              </svg>
                            </div>
                          )}
                        </label>
                      ))}
                    </div>
                  </div>


                ): productData.attribute_name[index] === 'talla-calzado' ? (
                  <div className="mb-4 max-w-md flex flex-col items-center">
                    <label
                      className="block text-sm font-medium text-black mb-2">
                      Seleccionar Talla:
                    </label>
                    <div className="flex flex-wrap justify-center gap-2">
                      {attributesOptions.tallaCalzadoOptions.map((talla) => (
                        <label
                          htmlFor={`talla-${talla.value}-${index}`}
                          key={talla.value}
                          className={`relative w-20 h-7 rounded-full border-2 cursor-pointer
                                      ${productData.attribute_value[index] === talla.value ? 'border-red-500 ring-2 ring-red-500' : 'border-gray-400'}
                                      hover:border-black transition-all duration-150 ease-in-out text-center`}
                          title={talla.display_value}
                          style={{fontWeight: "bold", color: 'black', fontSize: '14px'}}

                        >{talla.label}
                          <input
                            id={`talla-${talla.value}-${index}`}
                            name="attribute_value"
                            type="radio"
                            value={talla.value}
                            onChange={(e)=> handleChangeProductarray(e, index, talla.display_value, talla.order, talla.label)}
                            className="hidden"
                          />
                          {productData.attribute_value[index] === talla.value && (
                            <div className="absolute inset-0 flex items-center justify-center text-white">
                              <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                              </svg>
                            </div>
                          )}
                        </label>
                      ))}
                    </div>
                  </div>


                ) : productData.attribute_name[index] === 'talla-pantalon-hombre' ? (
                  <div className="mb-4 max-w-md flex flex-col items-center">
                    <label
                      className="block text-sm font-medium text-black mb-2">
                      Seleccionar Talla:
                    </label>
                    <div className="flex flex-wrap justify-center gap-2">
                      {attributesOptions.tallaMenPantsOptions.map((talla) => (
                        <label
                          htmlFor={`talla-${talla.value}-${index}`}
                          key={talla.value}
                          className={`relative w-20 h-7 rounded-full border-2 cursor-pointer
                                      ${productData.attribute_value[index] === talla.value ? 'border-red-500 ring-2 ring-red-500' : 'border-gray-400'}
                                      hover:border-black transition-all duration-150 ease-in-out text-center`}
                          title={talla.display_value}
                          style={{fontWeight: "bold", color: 'black', fontSize: '14px'}}

                        >{talla.label}
                          <input
                            id={`talla-${talla.value}-${index}`}
                            name="attribute_value"
                            type="radio"
                            value={talla.value}
                            onChange={(e)=> handleChangeProductarray(e, index, talla.display_value, talla.order, talla.value )}
                            className="hidden"
                          />
                          {productData.attribute_value[index] === talla.value && (
                            <div className="absolute inset-0 flex items-center justify-center text-white">
                              <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                              </svg>
                            </div>
                          )}
                        </label>
                      ))}
                    </div>
                  </div>


                ) : productData.attribute_name[index] === 'talla-pantalon-mujer' ? (
                  <div className="mb-4 max-w-md flex flex-col items-center">
                    <label
                      className="block text-sm font-medium text-black mb-2">
                      Seleccionar Talla:
                    </label>
                    <div className="flex flex-wrap justify-center gap-2">
                      {attributesOptions.tallaWomenPantsOptions.map((talla) => (
                        <label
                          htmlFor={`talla-${talla.value}-${index}`}
                          key={talla.value}
                          className={`relative w-20 h-7 rounded-full border-2 cursor-pointer
                                      ${productData.attribute_value[index] === talla.value ? 'border-red-500 ring-2 ring-red-500' : 'border-gray-400'}
                                      hover:border-black transition-all duration-150 ease-in-out text-center`}
                          title={talla.display_value}
                          style={{fontWeight: "bold", color: 'black', fontSize: '14px'}}

                        >{talla.label}
                          <input
                            id={`talla-${talla.value}-${index}`}
                            name="attribute_value"
                            type="radio"
                            value={talla.value}
                            onChange={(e)=> handleChangeProductarray(e,index, talla.display_value, talla.order, talla.abrev)}
                            className="hidden"
                          />
                          {productData.attribute_value[index] === talla.value && (
                            <div className="absolute inset-0 flex items-center justify-center text-white">
                              <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                              </svg>
                            </div>
                          )}
                        </label>
                      ))}
                    </div>
                  </div>


                ) : productData.attribute_name[index] === 'cantidad-unidades' ? (
                  <div className="mb-4 max-w-md flex flex-col items-center">
                    <label
                      className="block text-sm font-medium text-black mb-2">
                      Seleccionar Talla:
                    </label>
                    <div className="flex flex-wrap justify-center gap-2">
                      {attributesOptions.cantidadUnidadesOptions.map((cantidad) => (
                        <label
                          htmlFor={`talla-${cantidad.value}-${index}`}
                          key={cantidad.value}
                          className={`relative w-20 h-7 rounded-full border-2 cursor-pointer
                                      ${productData.attribute_value[index] === cantidad.value ? 'border-red-500 ring-2 ring-red-500' : 'border-gray-400'}
                                      hover:border-black transition-all duration-150 ease-in-out text-center`}
                          title={cantidad.display_value}
                          style={{fontWeight: "bold", color: 'black', fontSize: '14px'}}

                        >{cantidad.label}
                          <input
                            id={`talla-${cantidad.value}-${index}`}
                            name="attribute_value"
                            type="radio"
                            value={cantidad.value}
                            onChange={(e)=> handleChangeProductarray(e, index, cantidad.display_value, cantidad.order, cantidad.value)}
                            className="hidden"
                          />
                          {productData.attribute_value[index] === cantidad.value && (
                            <div className="absolute inset-0 flex items-center justify-center text-white">
                              <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                              </svg>
                            </div>
                          )}
                        </label>
                      ))}
                    </div>
                  </div>


                ) : productData.attribute_name[index] === 'material-textil' ? (
                  <div className="mb-4 max-w-md flex flex-col items-center">
                    <label
                      className="block text-sm font-medium text-black mb-2">
                      Seleccionar Talla:
                    </label>
                    <div className="flex flex-wrap justify-center gap-2">
                      {attributesOptions.materialTextilOptions.map((material) => (
                        <label
                          htmlFor={`talla-${material.value}-${index}`}
                          key={material.value}
                          className={`relative w-20 h-7 rounded-full border-2 cursor-pointer
                                      ${productData.attribute_value[index] === material.value ? 'border-red-500 ring-2 ring-red-500' : 'border-gray-400'}
                                      hover:border-black transition-all duration-150 ease-in-out text-center`}
                          title={material.display_value}
                          style={{fontWeight: "bold", color: 'black', fontSize: '14px'}}

                        >{material.label}
                          <input
                            id={`talla-${material.value}-${index}`}
                            name="attribute_value"
                            type="radio"
                            value={material.value}
                            onChange={(e)=> handleChangeProductarray(e, index, material.display_value, material.order, material.abrev)}
                            className="hidden"
                          />
                          {productData.attribute_value[index] === material.value && (
                            <div className="absolute inset-0 flex items-center justify-center text-white">
                              <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                              </svg>
                            </div>
                          )}
                        </label>
                      ))}
                    </div>
                  </div>
                ) : ('')}

              </div>
            ))}


            <div
              className="flex gap-2"
            >
              <button
                type="button"
                onClick={addAttributeFormFunction}
                className="w-fit bg-red-600 text-white text-sm py-2 px-2 mt-1 rounded-md hover:bg-black focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
              >Añadir atributo
              </button>
              {attributeFormNum[1] ? (
                <button
                  type="button"
                  onClick={removeAttributeButton}
                  className="w-fit bg-red-600 text-white text-sm py-2 px-2 mt-1 rounded-md hover:bg-black focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
                >Quitar atributo
                </button>
              ): ('')}
            </div>

            <label
              htmlFor="productDescription"
              className="block text-sm font-medium text-gray-700 mb-1"
              >Description del Producto:
            </label>
            <textarea
              name="description"
              id="productDescription"
              value={productData.description}
              onChange={handleChangeProduct}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
              >
            </textarea>


            <button
              type="submit"
              className="w-fit bg-black text-white font-bold text-sm py-2 px-4 mt-1 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus::ring-blue-500 focus:ring-offset-2"
              >Enviar
            </button>
          </form>
        </div>

        ////////////////////////////////////////////////////////////////////       CHOOSE FORM      /////////////////////////////////////////////////////////////////////
      ): isStatus.status === 'chooseForm' ?(

        <div className="flex flex-col gap-1">
          <div className="w-100 flex justify-center">
            <Link to={'/'}>
              <button
              className="bg-black text-red-700 text-lg font-bold rounded-md p-1 "
              type="button"
              >Home
            </button>
            </Link>
          </div>
          <div>
            <button
              className="bg-blue-500 text-white text-lg font-bold rounded-md p-1 "
              type="button"
              onClick={addVariant}
            >Añadir Variante
            </button>
            <button
              className="bg-red-500 text-white text-lg font-bold rounded-md p-1 "
              type="button"
              onClick={addProduct}
            >Añadir producto
            </button>
          </div>
        </div>



       ///////////////////////////////////////////////////////////////    VARIANT FORM    ////////////////////////////////////////////////////////////////////////////////

      ): isStatus.status === 'variantForm' ?(
        <div className="w-full max-w-screen-sm bg-white flex flex-col items-center shadow-sm p-8 rounded-md">
          <form onSubmit={handleSubmitVariant} className="space-y-2">

            <label
              htmlFor="price"
              className="block text-sm font-medium text-gray-700 mb-1"
            >Precio:
            </label>
            <input
              id="price"
              name="price"
              type="text" inputMode="decimal"
              value={productData.price}
              placeholder="0.00"
              onChange={handleChangeProduct}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />

            <label
              htmlFor="stock"
              className="block text-sm font-medium text-gray-700 mb-1"
            >Cantidad en stock:
            </label>

            <input
              id="stock"
              name="stock"
              type="text" inputMode="decimal"
              placeholder="0"
              value={productData.stock}
              onChange={handleChangeProduct}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />

            {attributeFormNum.map((_, index) => (
              <div key={index}>
                <label
                  htmlFor="attributeName"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >Atributo:
                </label>

                <select
                  id="attributeName"
                  name="attribute_name"
                  value={productData.attribute_name[index]}
                  onChange={(e)=> handleChangeProductarray(e,index)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="">-</option>
                    {attributesOptions.attributeNames.map((attribute) => (
                      <option
                        key={attribute.value}
                        value={attribute.value}
                        data-display-type={attribute.display_type}
                      >{attribute.name}
                      </option>
                    ))}
                </select>


                {productData.attribute_name[index] === 'color' ? (

                  <div className="mb-4 max-w-md flex flex-col items-center" >
                    <label
                      className="block text-sm font-medium text-gray-700 mb-2">
                      Seleccionar Color:
                    </label>
                    <div className="flex flex-wrap justify-center gap-2">
                      {attributesOptions.colorOptions.map((color) => (
                        <label
                          key={color.value}
                          htmlFor={`color-${color.value}-${index}`}
                          className={`relative w-8 h-7 rounded-full border-2 cursor-pointer
                                      ${productData.attribute_value[index] === color.value ? 'border-blue-500 ring-2 ring-blue-500' : 'border-gray-400'}
                                      hover:border-blue-400 transition-all duration-150 ease-in-out`}
                          style={{ backgroundColor: color.display_value}}
                          title={color.label}
                        >
                          <input
                            type="radio"
                            id={`color-${color.value}-${index}`}
                            name='attribute_value' // Nombre único para este grupo de radios
                            value={color.value}

                            onChange={(e) => handleChangeProductarray(e,index, color.display_value, color.order, color.abrev)}
                            className="hidden" // Oculta el radio button nativo
                          />
                          {/* Opcional: Mostrar un checkmark si está seleccionado */}
                          {productData.attribute_value[index] === color.value && (
                            <div className="absolute inset-0 flex items-center justify-center text-white">
                              <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                              </svg>
                            </div>
                          )}
                        </label>
                      ))}
                    </div>
                  </div>


                ) : productData.attribute_name[index] === 'talla-ropa-general' ?  (
                  <div className="mb-4 max-w-md flex flex-col items-center">
                    <label
                      className="block text-sm font-medium text-gray-700 mb-2">
                      Seleccionar Talla:
                    </label>
                    <div className="flex flex-wrap justify-center gap-2">
                      {attributesOptions.tallaGeneralOptions.map((talla) => (
                        <label
                          htmlFor={`talla-${talla.value}-${index}`}
                          key={talla.value}
                          className={`relative w-14 h-7 rounded-full border-2 cursor-pointer
                                      ${productData.attribute_value[index] === talla.value ? 'border-blue-500 ring-2 ring-blue-500' : 'border-gray-400'}
                                      hover:border-blue-400 transition-all duration-150 ease-in-out text-center`}
                          title={talla.display_value}
                          style={{fontWeight: "bold", color: 'dimgray', fontSize: '14px'}}

                        >{talla.label}
                          <input
                            id={`talla-${talla.value}-${index}`}
                            name="attribute_value"
                            type="radio"
                            value={talla.value}
                            onChange={(e)=> handleChangeProductarray(e, index, talla.label, talla.order, talla.value)}
                            className="hidden"

                          />
                          {/* Opcional: Mostrar un checkmark si está seleccionado */}
                          {productData.attribute_value[index] === talla.value && (
                            <div className="absolute inset-0 flex items-center justify-center text-white">
                              <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                              </svg>
                            </div>
                          )}
                        </label>
                      ))}
                    </div>
                  </div>


                ): productData.attribute_name[index] === 'talla-calzado' ? (
                  <div className="mb-4 max-w-md flex flex-col items-center">
                    <label
                      className="block text-sm font-medium text-gray-700 mb-2">
                      Seleccionar Talla:
                    </label>
                    <div className="flex flex-wrap justify-center gap-2">
                      {attributesOptions.tallaCalzadoOptions.map((talla) => (
                        <label
                          htmlFor={`talla-${talla.value}-${index}`}
                          key={talla.value}
                          className={`relative w-20 h-7 rounded-full border-2 cursor-pointer
                                      ${productData.attribute_value[index] === talla.value ? 'border-blue-500 ring-2 ring-blue-500' : 'border-gray-400'}
                                      hover:border-blue-400 transition-all duration-150 ease-in-out text-center`}
                          title={talla.display_value}
                          style={{fontWeight: "bold", color: 'dimgray', fontSize: '14px'}}

                        >{talla.label}
                          <input
                            id={`talla-${talla.value}-${index}`}
                            name="attribute_value"
                            type="radio"
                            value={talla.value}
                            onChange={(e)=> handleChangeProductarray(e, index, talla.display_value, talla.order, talla.label)}
                            className="hidden"

                          />
                          {/* Opcional: Mostrar un checkmark si está seleccionado */}
                          {productData.attribute_value[index] === talla.value && (
                            <div className="absolute inset-0 flex items-center justify-center text-white">
                              <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                              </svg>
                            </div>
                          )}
                        </label>
                      ))}
                    </div>
                  </div>


                ) : productData.attribute_name[index] === 'talla-pantalon-hombre' ? (
                  <div className="mb-4 max-w-md flex flex-col items-center">
                    <label
                      className="block text-sm font-medium text-gray-700 mb-2">
                      Seleccionar Talla:
                    </label>
                    <div className="flex flex-wrap justify-center gap-2">
                      {attributesOptions.tallaMenPantsOptions.map((talla) => (
                        <label
                          htmlFor={`talla-${talla.value}-${index}`}
                          key={talla.value}
                          className={`relative w-20 h-7 rounded-full border-2 cursor-pointer
                                      ${productData.attribute_value[index] === talla.value ? 'border-blue-500 ring-2 ring-blue-500' : 'border-gray-400'}
                                      hover:border-blue-400 transition-all duration-150 ease-in-out text-center`}
                          title={talla.display_value}
                          style={{fontWeight: "bold", color: 'dimgray', fontSize: '14px'}}

                        >{talla.label}
                          <input
                            id={`talla-${talla.value}-${index}`}
                            name="attribute_value"
                            type="radio"
                            value={talla.value}
                            onChange={(e)=> handleChangeProductarray(e, index, talla.display_value, talla.order, talla.value )}
                            className="hidden"

                          />
                          {/* Opcional: Mostrar un checkmark si está seleccionado */}
                          {productData.attribute_value[index] === talla.value && (
                            <div className="absolute inset-0 flex items-center justify-center text-white">
                              <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                              </svg>
                            </div>
                          )}
                        </label>
                      ))}
                    </div>
                  </div>


                ) : productData.attribute_name[index] === 'talla-pantalon-mujer' ? (
                  <div className="mb-4 max-w-md flex flex-col items-center">
                    <label
                      className="block text-sm font-medium text-gray-700 mb-2">
                      Seleccionar Talla:
                    </label>
                    <div className="flex flex-wrap justify-center gap-2">
                      {attributesOptions.tallaWomenPantsOptions.map((talla) => (
                        <label
                          htmlFor={`talla-${talla.value}-${index}`}
                          key={talla.value}
                          className={`relative w-20 h-7 rounded-full border-2 cursor-pointer
                                      ${productData.attribute_value[index] === talla.value ? 'border-blue-500 ring-2 ring-blue-500' : 'border-gray-400'}
                                      hover:border-blue-400 transition-all duration-150 ease-in-out text-center`}
                          title={talla.display_value}
                          style={{fontWeight: "bold", color: 'dimgray', fontSize: '14px'}}

                        >{talla.label}
                          <input
                            id={`talla-${talla.value}-${index}`}
                            name="attribute_value"
                            type="radio"
                            value={talla.value}
                            onChange={(e)=> handleChangeProductarray(e,index, talla.display_value, talla.order, talla.abrev)}
                            className="hidden"

                          />
                          {/* Opcional: Mostrar un checkmark si está seleccionado */}
                          {productData.attribute_value[index] === talla.value && (
                            <div className="absolute inset-0 flex items-center justify-center text-white">
                              <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                              </svg>
                            </div>
                          )}
                        </label>
                      ))}
                    </div>
                  </div>


                ) : productData.attribute_name[index] === 'cantidad-unidades' ? (
                  <div className="mb-4 max-w-md flex flex-col items-center">
                    <label
                      className="block text-sm font-medium text-gray-700 mb-2">
                      Seleccionar Talla:
                    </label>
                    <div className="flex flex-wrap justify-center gap-2">
                      {attributesOptions.cantidadUnidadesOptions.map((cantidad) => (
                        <label
                          htmlFor={`talla-${cantidad.value}-${index}`}
                          key={cantidad.value}
                          className={`relative w-20 h-7 rounded-full border-2 cursor-pointer
                                      ${productData.attribute_value[index] === cantidad.value ? 'border-blue-500 ring-2 ring-blue-500' : 'border-gray-400'}
                                      hover:border-blue-400 transition-all duration-150 ease-in-out text-center`}
                          title={cantidad.display_value}
                          style={{fontWeight: "bold", color: 'dimgray', fontSize: '14px'}}

                        >{cantidad.label}
                          <input
                            id={`talla-${cantidad.value}-${index}`}
                            name="attribute_value"
                            type="radio"
                            value={cantidad.value}
                            onChange={(e)=> handleChangeProductarray(e, index, cantidad.display_value, cantidad.order, cantidad.value)}
                            className="hidden"

                          />
                          {/* Opcional: Mostrar un checkmark si está seleccionado */}
                          {productData.attribute_value[index] === cantidad.value && (
                            <div className="absolute inset-0 flex items-center justify-center text-white">
                              <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                              </svg>
                            </div>
                          )}
                        </label>
                      ))}
                    </div>
                  </div>


                ) : productData.attribute_name[index] === 'material-textil' ? (
                  <div className="mb-4 max-w-md flex flex-col items-center">
                    <label
                      className="block text-sm font-medium text-gray-700 mb-2">
                      Seleccionar Talla:
                    </label>
                    <div className="flex flex-wrap justify-center gap-2">
                      {attributesOptions.materialTextilOptions.map((material) => (
                        <label
                          htmlFor={`talla-${material.value}-${index}`}
                          key={material.value}
                          className={`relative w-20 h-7 rounded-full border-2 cursor-pointer
                                      ${productData.attribute_value[index] === material.value ? 'border-blue-500 ring-2 ring-blue-500' : 'border-gray-400'}
                                      hover:border-blue-400 transition-all duration-150 ease-in-out text-center`}
                          title={material.display_value}
                          style={{fontWeight: "bold", color: 'dimgray', fontSize: '14px'}}

                        >{material.label}
                          <input
                            id={`talla-${material.value}-${index}`}
                            name="attribute_value"
                            type="radio"
                            value={material.value}
                            onChange={(e)=> handleChangeProductarray(e, index, material.display_value, material.order, material.abrev)}
                            className="hidden"

                          />
                          {/* Opcional: Mostrar un checkmark si está seleccionado */}
                          {productData.attribute_value[index] === material.value && (
                            <div className="absolute inset-0 flex items-center justify-center text-white">
                              <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                              </svg>
                            </div>
                          )}
                        </label>
                      ))}
                    </div>
                  </div>
                ) : ('')}
                <button
                  type="button"
                  onClick={addAttributeFormFunction}
                  className="w-fit bg-blue-600 text-white text-sm py-2 px-4 mt-1 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus::ring-blue-500 focus:ring-offset-2"
                >Añadir atributo
                </button>
              </div>

            ))}

            <button
              type="submit"
              className="w-fit bg-blue-600 text-white text-sm py-2 px-4 mt-1 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus::ring-blue-500 focus:ring-offset-2"
            >Subir
            </button>
          </form>
        </div>
      ) : ('')}
    </div>
  )
}

export default AddProduct;
