/* eslint-disable no-dupe-class-members */
/* eslint-disable no-unused-vars */
/* eslint-disable no-redeclare */
/* eslint-disable no-dupe-keys */
/* eslint-disable react/prop-types */
import React, { Component } from 'react';
import { Navigate } from 'react-router-dom';
import axios from 'axios';
import { Select, MenuItem, Card, Grid } from '@mui/material';
import MDTypography from 'components/MDTypography';
import MDInput from 'components/MDInput';
import MDButton from 'components/MDButton';
import MDBox from 'components/MDBox';
import burceMars from 'assets/images/userimage.webp';
import { apiConstants } from '../../API/apiConstrants';
import { sweetalertsuccess, sweetalertwarning } from '../../helper/alert';

class Overview extends Component {
  constructor(props) {
    super(props);
    this.state = {
      errors: {},
      name: '',
      plave: '',
      SocialData: JSON.parse(this.props.nearBylocality),
      socialArray: [
        {
          id: 1,
          name: 'Website',
          regex: '(https|http):\\/\\/(www\\.)*'
        },
        {
          id: 4,
          name: 'Last.fm',
          regex: '(https|http):\\/\\/www\\.(lastfm\\.com|last\\.fm\\/|lastfm\\.ch).*'
        }
      ],
      address: this.props.address,
      employee_photo: [],
      locality: this.props.locality,
      street: this.props.street,
      state: this.props.state,
      city: this.props.city,
      zipcode: this.props.zipcode,
      featuredProperty: this.props.featuredProperty,
      propertyFor: this.props.propertyFor,
      propertyType: this.props.propertyType,
      thePrice: this.props.thePrice,
      securityDeposit: this.props.securityDeposit,
      beds: this.props.beds,
      baths: this.props.baths,
      kitchenSize: this.props.kitchenSize,
      buildupArea: this.props.buildupArea,
      leaseDuration: this.props.leaseDuration,
      serventQuarters: this.props.serventQuarters,
      calling: this.props.calling,
      appliances: this.props.appliances,
      floorSize: this.props.floorSize,
      flooringType: this.props.flooringType,
      dateAvailable: this.props.dateAvailable,
      propertyDesc: this.props.propertyDesc,
      accomodation: this.props.accomodation,
      plotSize: this.props.plotSize,
      yourBuilt: this.props.yourBuilt,
      parking: this.props.parking,
      services: this.props.services,
      nearBylocality: this.props.nearBylocality,
      propertyImages: this.props.propertyImages,
      propertyImagesedit: [],

      // selectedphoto: [],
      photoUrl: burceMars,
      selectedFilesdoc: [],
      selectedFiles: [],
      selectedimg: [],
      photoUrl: apiConstants.BASE_URL + '/images/'
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleImageChange = this.handleImageChange.bind(this);
    this.validate = this.validate.bind(this);

    this.handleInputVlauePlaceChange = this.handleInputVlauePlaceChange.bind(this);

    this.handleAddSocial = this.handleAddSocial.bind(this);
    this.handleInputVlaueChange = this.handleInputVlaueChange.bind(this);
    this.handleRemoveSocial = this.handleRemoveSocial.bind(this);
    this.handleSocialNameChange = this.handleSocialNameChange.bind(this);
  }
  handleAddSocial() {
    let array = this.state.SocialData;
    array.push({ id: array.length + 1, socialname: '' });
    this.setState({ SocialData: array });
  }
  handleInputVlaueChange(e, idx) {
    let nextSocialData = this.state.SocialData.slice();
    nextSocialData[idx].name = e.target.value;
    this.setState({ SocialData: nextSocialData });
    // console.log(this.state.SocialData);
  }
  handleInputVlauePlaceChange(e, idx) {
    let nextSocialData = this.state.SocialData.slice();
    nextSocialData[idx].place = e.target.value;
    this.setState({ SocialData: nextSocialData });
    // console.log(this.state.SocialData);
  }
  handleSocialNameChange(socialName, idx) {
    let nextSocialData = this.state.SocialData.slice();
    nextSocialData[idx].socialname = socialName;
    this.setState({ SocialData: nextSocialData });
    // console.log(this.state.SocialData);
  }
  handleRemoveSocial(idx) {
    let someArray = this.state.SocialData;
    someArray.splice(idx, 1);
    this.setState({ SocialData: someArray });
  }

  handleChange(event) {
    this.setState({ [event.target.name]: event.target.value });
  }

  handleSubmit = async (e) => {
    e.preventDefault();
    if (this.validate()) {
      if (this.state.selectedimg || this.props.propertyImages) {
        const data = new FormData();
        for (const key of Object.keys(this.state.selectedimg)) {
          data.append('propertyImages', this.state.selectedimg[key]);
        }
        const arrayOfObj = Object.entries(this.state.selectedimg).map((e) => e[1]['name']);
        await axios.post(apiConstants.PROPERTY_PHOTO_UPLOAD, data).then((res) => {
          if (arrayOfObj.length > 0) {
            var body = JSON.stringify({
              id: this.props.id,
              address: this.state.address,
              locality: this.state.locality,
              propertyImages: JSON.stringify(arrayOfObj),
              street: this.state.street,
              state: this.state.state,
              city: this.state.city,
              zipcode: this.state.zipcode,
              featuredProperty: this.state.featuredProperty,
              propertyFor: this.state.propertyFor,
              propertyType: this.state.propertyType,
              thePrice: this.state.thePrice,
              securityDeposit: this.state.securityDeposit,
              beds: this.state.beds,
              baths: this.state.baths,
              kitchenSize: this.state.kitchenSize,
              buildupArea: this.state.buildupArea,
              leaseDuration: this.state.leaseDuration,
              serventQuarters: this.state.serventQuarters,
              calling: this.state.calling,
              appliances: this.state.appliances,
              floorSize: this.state.floorSize,
              flooringType: this.state.flooringType,
              dateAvailable: this.state.dateAvailable,
              propertyDesc: this.state.propertyDesc,
              accomodation: this.state.accomodation,
              plotSize: this.state.plotSize,
              yourBuilt: this.state.yourBuilt,
              parking: this.state.parking,
              services: this.state.services,
              nearBylocality: JSON.stringify(this.state.SocialData)
            });
          } else {
            var body = JSON.stringify({
              id: this.props.id,
              address: this.state.address,
              locality: JSON.stringify(this.state.locality),
              street: this.state.street,
              state: this.state.state,
              city: this.state.city,
              zipcode: this.state.zipcode,
              featuredProperty: this.state.featuredProperty,
              propertyFor: this.state.propertyFor,
              propertyType: this.state.propertyType,
              thePrice: this.state.thePrice,
              securityDeposit: this.state.securityDeposit,
              beds: this.state.beds,
              baths: this.state.baths,
              kitchenSize: this.state.kitchenSize,
              buildupArea: this.state.buildupArea,
              leaseDuration: this.state.leaseDuration,
              serventQuarters: this.state.serventQuarters,
              calling: this.state.calling,
              appliances: this.state.appliances,
              floorSize: this.state.floorSize,
              flooringType: this.state.flooringType,
              dateAvailable: this.state.dateAvailable,
              propertyDesc: this.state.propertyDesc,
              accomodation: this.state.accomodation,
              plotSize: this.state.plotSize,
              yourBuilt: this.state.yourBuilt,
              parking: this.state.parking,
              services: this.state.services,
              nearBylocality: JSON.stringify(this.state.SocialData)
            });
          }
          let method;
          method = 'PUT';
          let APIURL = apiConstants.PROPERTY_UPDATE_URL;
          var myHeaders = new Headers();
          myHeaders.append('Content-Type', 'application/json');

          var requestOptions = {
            method: method,
            headers: myHeaders,
            body: body,
            redirect: 'follow'
          };
          fetch(APIURL, requestOptions)
            .then((response) => response.text())
            .then((result) => this.setState({}))
            .then(sweetalertsuccess('Property added succesfully'))
            .catch((error) => console.log('error', error));
        });
      }
    }
  };

  validate = () => {
    let errors = {};
    let isValid = true;
    if (!this.state.address) {
      isValid = false;
      errors['address'] = 'This field is required';
    }
    if (!this.state.locality) {
      isValid = false;
      errors['locality'] = 'This field is required';
    }
    if (!this.state.street) {
      isValid = false;
      errors['street'] = 'This field is required';
    }
    if (!this.state.state) {
      isValid = false;
      errors['state'] = 'This field is required';
    }

    if (!this.state.city) {
      isValid = false;
      errors['city'] = 'This field is required';
    }
    if (!this.state.zipcode) {
      isValid = false;
      errors['zipcode'] = 'This field is required';
    }
    if (!this.state.featuredProperty) {
      isValid = false;
      errors['featuredProperty'] = 'This field is required';
    }
    if (!this.state.propertyFor) {
      isValid = false;
      errors['propertyFor'] = 'This field is required';
    }
    if (!this.state.propertyType) {
      isValid = false;
      errors['propertyType'] = 'This field is required';
    }
    if (!this.state.thePrice) {
      isValid = false;
      errors['thePrice'] = 'This field is required';
    }
    if (!this.state.securityDeposit) {
      isValid = false;
      errors['securityDeposit'] = 'This field is required';
    }
    if (!this.state.beds) {
      isValid = false;
      errors['beds'] = 'This field is required';
    }
    if (!this.state.baths) {
      isValid = false;
      errors['baths'] = 'This field is required';
    }
    if (!this.state.kitchenSize) {
      isValid = false;
      errors['kitchenSize'] = 'This field is required';
    }
    if (!this.state.buildupArea) {
      isValid = false;
      errors['buildupArea'] = 'This field is required';
    }
    if (!this.state.leaseDuration) {
      isValid = false;
      errors['leaseDuration'] = 'This field is required';
    }
    if (!this.state.serventQuarters) {
      isValid = false;
      errors['serventQuarters'] = 'This field is required';
    }
    if (!this.state.calling) {
      isValid = false;
      errors['calling'] = 'This field is required';
    }
    if (!this.state.appliances) {
      isValid = false;
      errors['appliances'] = 'This field is required';
    }
    if (!this.state.floorSize) {
      isValid = false;
      errors['floorSize'] = 'This field is required';
    }
    if (!this.state.flooringType) {
      isValid = false;
      errors['flooringType'] = 'This field is required';
    }
    if (!this.state.dateAvailable) {
      isValid = false;
      errors['dateAvailable'] = 'This field is required';
    }
    if (!this.state.propertyDesc) {
      isValid = false;
      errors['propertyDesc'] = 'This field is required';
    }
    if (!this.state.accomodation) {
      isValid = false;
      errors['accomodation'] = 'This field is required';
    }
    if (!this.state.plotSize) {
      isValid = false;
      errors['plotSize'] = 'This field is required';
    }
    if (!this.state.yourBuilt) {
      isValid = false;
      errors['yourBuilt'] = 'This field is required';
    }
    if (!this.state.parking) {
      isValid = false;
      errors['parking'] = 'This field is required';
    }
    if (!this.state.services) {
      isValid = false;
      errors['services'] = 'This field is required';
    }
    if (!this.state.nearBylocality) {
      isValid = false;
      errors['nearBylocality'] = 'This field is required';
    }
    this.setState({
      errors: errors
    });
    return isValid;
  };
  checkMimeType = (event) => {
    //getting file object
    let files = event.target.files;
    //define message container
    let err = '';
    // list allow mime type
    const types = ['image/png', 'image/jpeg', 'image/gif'];
    // loop access array
    for (var x = 0; x < files.length; x++) {
      // compare file type find doesn't matach
      if (types.every((type) => files[x].type !== type)) {
        // create error message and assign to container
        err += files[x].type + ' is not a supported format\n';
      }
    }
    if (err !== '') {
      // if message not same old that mean has error
      event.target.value = null; // discard selected file
      console.log(err);
      // setimagemessage(err);
      return false;
    }
    return true;
  };
  handleImageChange = async (e) => {
    if (this.maxSelectFile(e)) {
      if (e.target.files) {
        const filesArray = Array.from(e.target.files).map((file) => URL.createObjectURL(file));
        await this.setState((state) => ({
          selectedFiles: this.state.selectedFiles.concat(filesArray)
        }));
        await this.setState((state) => ({
          selectedimg: e.target.files
        }));
        // setSelectedFiles((prevImages) => prevImages.concat(filesArray));
        // setSelectedimg(e.target.files);

        console.log(this.state.selectedimg);

        Array.from(e.target.files).map(
          (file) => URL.revokeObjectURL(file) // avoid memory leak
        );
      }
    }
  };
  maxSelectFile = (event) => {
    let files = event.target.files; // create file object
    if (files.length < 2) {
      sweetalertwarning('Minimum 2 images need to upload');
      event.target.value = null; // discard selected file
      // console.log(msg);
      // setimagemessage(msg);
      return false;
    }
    return true;
  };
  checkMimeType = (event) => {
    //getting file object
    let files = event.target.files;
    //define message container
    let err = '';
    // list allow mime type
    const types = ['image/png', 'image/jpeg', 'image/gif'];
    // loop access array
    for (var x = 0; x < files.length; x++) {
      // compare file type find doesn't matach
      if (types.every((type) => files[x].type !== type)) {
        // create error message and assign to container
        err += files[x].type + ' is not a supported format\n';
      }
    }
    if (err !== '') {
      // if message not same old that mean has error
      event.target.value = null; // discard selected file
      console.log(err);
      // setimagemessage(err);
      return false;
    }
    return true;
  };
  deleteFile = async (e) => {
    const s = await this.state.selectedFiles.filter((item, index) => index !== e);
    await this.setState({ selectedFiles: s });
    // console.log(s);
  };
  renderPhotos = (source) => {
    return source.map((photo, index) => {
      // console.log(photo.image_path);
      var imgesrc = '/' + photo.image_path;
      if (photo.image_path == undefined) {
        var imgesrc = photo;
      }
      return (
        <div key={index}>
          <button type="button" onClick={() => this.deleteFile(index)}>
            Remove
          </button>
          <img className="renderimage" src={imgesrc} alt="" key={photo} />
        </div>
      );
    });
  };

  render() {
    if (!localStorage.getItem('jwtToken')) {
      return <Navigate to="/authentication/sign-in" />;
    }
    var data = JSON.parse(this.props.propertyImages);
    var propertyphotos = [];
    for (var i = 0; i < data.length; i++) {
      propertyphotos.push(
        <img
          className="editpropertyimg"
          src={this.state.photoUrl + JSON.parse(this.props.propertyImages)[i]}
        />
      );
    }
    return (
      <MDBox>
        <MDBox mb={5} />
        <Card>
          <MDBox
            mx={1}
            mt={-8}
            py={1}
            px={1}
            variant="gradient"
            bgColor="info"
            borderRadius="lg"
            coloredShadow="info"
            display="flex"
            justifyContent="space-between"
            alignItems="center">
            <MDTypography variant="h6" color="white">
              Edit property details
            </MDTypography>
          </MDBox>
          <MDBox
            container
            spacing={2}
            mt={5}
            mb={3}
            component="form"
            role="form"
            onSubmit={this.handleSubmit}>
            <Grid container spacing={6}>
              <Grid item xs={12} md={6} xl={3}>
                <MDTypography variant="h6" fontWeight="medium">
                  Location
                </MDTypography>
                <MDBox mb={2}>
                  <MDTypography variant="caption" fontWeight="bold" color="error">
                    ‏‏‎ ‎ {this.state.errors.address}
                  </MDTypography>
                  <MDInput
                    type="text"
                    name="address"
                    onChange={this.handleChange}
                    value={this.state.address}
                    label="Address"
                    fullWidth
                  />
                </MDBox>

                <MDBox mb={2}>
                  <MDTypography variant="caption" fontWeight="bold" color="error">
                    ‏‏‎ ‎ {this.state.errors.locality}
                  </MDTypography>
                  <MDInput
                    type="text"
                    name="locality"
                    onChange={this.handleChange}
                    value={this.state.locality}
                    label="Locality"
                    fullWidth
                  />
                </MDBox>
                <MDBox mb={2}>
                  <MDTypography variant="caption" fontWeight="bold" color="error">
                    ‏‏‎ ‎ {this.state.errors.street}
                  </MDTypography>
                  <MDInput
                    type="text"
                    name="street"
                    onChange={this.handleChange}
                    value={this.state.street}
                    label="Street"
                    fullWidth
                  />
                </MDBox>
                <MDBox mb={2}>
                  <MDTypography variant="caption" fontWeight="bold" color="error">
                    ‏‏‎ ‎ {this.state.errors.state}
                  </MDTypography>
                  <MDInput
                    type="text"
                    name="state"
                    onChange={this.handleChange}
                    value={this.state.state}
                    label="State"
                    fullWidth
                  />
                </MDBox>
                <MDBox mb={2}>
                  <MDTypography variant="caption" fontWeight="bold" color="error">
                    ‏‏‎ ‎ {this.state.errors.city}
                  </MDTypography>
                  <MDInput
                    type="text"
                    name="city"
                    onChange={this.handleChange}
                    value={this.state.city}
                    label="City"
                    fullWidth
                  />
                </MDBox>
                <MDBox mb={2}>
                  <MDTypography variant="caption" fontWeight="bold" color="error">
                    ‏‏‎ ‎ {this.state.errors.zipcode}
                  </MDTypography>
                  <MDInput
                    type="text"
                    name="zipcode"
                    onChange={this.handleChange}
                    value={this.state.zipcode}
                    label="Zip code"
                    fullWidth
                  />
                </MDBox>
              </Grid>
              <Grid item xs={12} md={6} xl={3}>
                <MDTypography variant="h6" fontWeight="medium">
                  Featured property
                </MDTypography>
                <MDBox mb={2}>
                  <MDTypography variant="caption" fontWeight="bold" color="error">
                    ‏‏‎ ‎ {this.state.errors.featuredProperty}
                  </MDTypography>
                  <MDInput
                    type="text"
                    name="featuredProperty"
                    onChange={this.handleChange}
                    value={this.state.featuredProperty}
                    label="Featured roperty"
                    fullWidth
                  />
                </MDBox>
                <MDBox mb={2}>
                  <MDTypography variant="caption" fontWeight="bold" color="error">
                    ‏‏‎ ‎ {this.state.errors.propertyFor}
                  </MDTypography>
                  <MDInput
                    type="text"
                    name="propertyFor"
                    onChange={this.handleChange}
                    value={this.state.propertyFor}
                    label="Property for"
                    fullWidth
                  />
                </MDBox>
                <MDBox mb={2}>
                  <MDTypography variant="caption" fontWeight="bold" color="error">
                    ‏‏‎ ‎ {this.state.errors.propertyType}
                  </MDTypography>
                  <MDInput
                    type="text"
                    name="propertyType"
                    onChange={this.handleChange}
                    value={this.state.propertyType}
                    label="Property type"
                    fullWidth
                  />
                </MDBox>
                <MDBox mb={2}>
                  <MDTypography variant="caption" fontWeight="bold" color="error">
                    ‏‏‎ ‎ {this.state.errors.thePrice}
                  </MDTypography>
                  <MDInput
                    type="text"
                    name="thePrice"
                    onChange={this.handleChange}
                    value={this.state.thePrice}
                    label="The price"
                    fullWidth
                  />
                </MDBox>
                <MDBox mb={2}>
                  <MDTypography variant="caption" fontWeight="bold" color="error">
                    ‏‏‎ ‎ {this.state.errors.securityDeposit}
                  </MDTypography>
                  <MDInput
                    type="text"
                    name="securityDeposit"
                    onChange={this.handleChange}
                    value={this.state.securityDeposit}
                    label="Security deposit"
                    fullWidth
                  />
                </MDBox>
                <MDBox mb={2}>
                  <MDTypography variant="caption" fontWeight="bold" color="error">
                    ‏‏‎ ‎ {this.state.errors.beds}
                  </MDTypography>
                  <MDInput
                    type="text"
                    name="beds"
                    onChange={this.handleChange}
                    value={this.state.beds}
                    label="Beds"
                    fullWidth
                  />
                </MDBox>
              </Grid>
              <Grid item xs={12} md={6} xl={3}>
                <MDTypography variant="h6" fontWeight="medium">
                  ‏‏‎ ‎
                </MDTypography>

                <MDBox mb={2}>
                  <MDTypography variant="caption" fontWeight="bold" color="error">
                    ‏‏‎ ‎ {this.state.errors.baths}
                  </MDTypography>
                  <MDInput
                    type="text"
                    name="baths"
                    onChange={this.handleChange}
                    value={this.state.baths}
                    label="Baths"
                    fullWidth
                  />
                </MDBox>
                <MDBox mb={2}>
                  <MDTypography variant="caption" fontWeight="bold" color="error">
                    ‏‏‎ ‎ {this.state.errors.kitchenSize}
                  </MDTypography>
                  <MDInput
                    type="text"
                    name="kitchenSize"
                    onChange={this.handleChange}
                    value={this.state.kitchenSize}
                    label="kitchen size"
                    fullWidth
                  />
                </MDBox>
                <MDBox mb={2}>
                  <MDTypography variant="caption" fontWeight="bold" color="error">
                    ‏‏‎ ‎ {this.state.errors.buildupArea}
                  </MDTypography>
                  <MDInput
                    type="text"
                    name="buildupArea"
                    onChange={this.handleChange}
                    value={this.state.buildupArea}
                    label="Buildup area"
                    fullWidth
                  />
                </MDBox>
                <MDBox mb={2}>
                  <MDTypography variant="caption" fontWeight="bold" color="error">
                    ‏‏‎ ‎ {this.state.errors.leaseDuration}
                  </MDTypography>
                  <MDInput
                    type="text"
                    name="leaseDuration"
                    onChange={this.handleChange}
                    value={this.state.leaseDuration}
                    label="Lease duration"
                    fullWidth
                  />
                </MDBox>
                <MDBox mb={2}>
                  <MDTypography variant="caption" fontWeight="bold" color="error">
                    ‏‏‎ ‎ {this.state.errors.serventQuarters}
                  </MDTypography>
                  <MDInput
                    type="text"
                    name="serventQuarters"
                    onChange={this.handleChange}
                    value={this.state.serventQuarters}
                    label="Servent quarters"
                    fullWidth
                  />
                </MDBox>
              </Grid>
              <Grid item xs={12} md={6} xl={3}>
                <MDTypography variant="h6" fontWeight="medium">
                  ‏‏‎ ‎
                </MDTypography>

                <MDBox mb={2}>
                  <MDTypography variant="caption" fontWeight="bold" color="error">
                    ‏‏‎ ‎ {this.state.errors.calling}
                  </MDTypography>
                  <MDInput
                    type="text"
                    name="calling"
                    onChange={this.handleChange}
                    value={this.state.calling}
                    label="Calling"
                    fullWidth
                  />
                </MDBox>
                <MDBox mb={2}>
                  <MDTypography variant="caption" fontWeight="bold" color="error">
                    ‏‏‎ ‎ {this.state.errors.appliances}
                  </MDTypography>
                  <MDInput
                    type="text"
                    name="appliances"
                    onChange={this.handleChange}
                    value={this.state.appliances}
                    label="Appliances"
                    fullWidth
                  />
                </MDBox>
                <MDBox mb={2}>
                  <MDTypography variant="caption" fontWeight="bold" color="error">
                    ‏‏‎ ‎ {this.state.errors.floorSize}
                  </MDTypography>
                  <MDInput
                    type="text"
                    name="floorSize"
                    onChange={this.handleChange}
                    value={this.state.floorSize}
                    label="Floor size"
                    fullWidth
                  />
                </MDBox>
                <MDBox mb={2}>
                  <MDTypography variant="caption" fontWeight="bold" color="error">
                    ‏‏‎ ‎ {this.state.errors.flooringType}
                  </MDTypography>
                  <MDInput
                    type="text"
                    name="flooringType"
                    onChange={this.handleChange}
                    value={this.state.flooringType}
                    label="Flooring type"
                    fullWidth
                  />
                </MDBox>
                <MDBox mb={2}>
                  <MDTypography variant="caption" fontWeight="bold" color="error">
                    ‏‏‎ ‎ {this.state.errors.dateAvailable}
                  </MDTypography>
                  <MDInput
                    type="text"
                    name="dateAvailable"
                    onChange={this.handleChange}
                    value={this.state.dateAvailable}
                    label="Date available"
                    fullWidth
                  />
                </MDBox>
              </Grid>
            </Grid>

            <Grid container spacing={6}>
              <Grid item xs={12} md={6} xl={4}>
                <MDTypography variant="h6" fontWeight="medium">
                  Property description
                </MDTypography>
                <MDBox mb={2}>
                  <MDTypography variant="caption" fontWeight="bold" color="error">
                    ‏‏‎ ‎ {this.state.errors.propertyDesc}
                  </MDTypography>

                  <MDInput
                    type="text"
                    name="propertyDesc"
                    onChange={this.handleChange}
                    value={this.state.propertyDesc}
                    label="Property desc"
                    fullWidth
                  />
                </MDBox>
              </Grid>
              <Grid item xs={12} md={6} xl={4}>
                <MDTypography variant="h6" fontWeight="medium">
                  Property heighlights
                </MDTypography>

                <MDBox mb={2}>
                  <MDTypography variant="caption" fontWeight="bold" color="error">
                    ‏‏‎ ‎ {this.state.errors.accomodation}
                  </MDTypography>
                  <MDInput
                    type="text"
                    name="accomodation"
                    onChange={this.handleChange}
                    value={this.state.accomodation}
                    label="Accomodation"
                    fullWidth
                  />
                </MDBox>
                <MDBox mb={2}>
                  <MDTypography variant="caption" fontWeight="bold" color="error">
                    ‏‏‎ ‎ {this.state.errors.plotSize}
                  </MDTypography>
                  <MDInput
                    type="text"
                    name="plotSize"
                    onChange={this.handleChange}
                    value={this.state.plotSize}
                    label="Plot size"
                    fullWidth
                  />
                </MDBox>
                <MDBox mb={2}>
                  <MDTypography variant="caption" fontWeight="bold" color="error">
                    ‏‏‎ ‎ {this.state.errors.yourBuilt}
                  </MDTypography>
                  <MDInput
                    type="text"
                    name="yourBuilt"
                    onChange={this.handleChange}
                    value={this.state.yourBuilt}
                    label="Your built"
                    fullWidth
                  />
                </MDBox>
              </Grid>
              <Grid item xs={12} md={6} xl={4}>
                <MDTypography variant="h6" fontWeight="medium">
                  ‏‏‎ ‎
                </MDTypography>
                <MDBox mb={2}>
                  <MDTypography variant="caption" fontWeight="bold" color="error">
                    ‏‏‎ ‎ {this.state.errors.parking}
                  </MDTypography>
                  <MDInput
                    type="text"
                    name="parking"
                    onChange={this.handleChange}
                    value={this.state.parking}
                    label="Parking"
                    fullWidth
                  />
                </MDBox>
                <MDBox mb={2}>
                  <MDTypography variant="caption" fontWeight="bold" color="error">
                    ‏‏‎ ‎ {this.state.errors.services}
                  </MDTypography>
                  <MDInput
                    type="text"
                    name="services"
                    onChange={this.handleChange}
                    value={this.state.services}
                    label="Services"
                    fullWidth
                  />
                </MDBox>
              </Grid>
            </Grid>

            <Grid container spacing={6}>
              <Grid item xs={12} md={6} xl={4}>
                <MDTypography variant="h6" fontWeight="medium">
                  Upload property images
                </MDTypography>
                Minimum 2 images
                <MDBox mb={2}>
                  <MDInput
                    type="file"
                    inputProps={{
                      multiple: true
                    }}
                    name="propertyImages"
                    onChange={this.handleImageChange}
                    fullWidth
                  />
                </MDBox>
              </Grid>
              <Grid item xs={12} md={6} xl={4}>
                <MDTypography variant="h6" fontWeight="medium">
                  ‏‏‎ ‎
                </MDTypography>
                {this.renderPhotos(this.state.selectedFiles)}
                <div>{propertyphotos}</div>
              </Grid>
              <Grid item xs={12} md={6} xl={4}>
                <MDTypography variant="h6" fontWeight="medium">
                  ‏‏‎ ‎
                </MDTypography>
              </Grid>
            </Grid>
            <Grid container spacing={6}>
              <Grid item xs={12} md={6} xl={12}>
                <MDTypography variant="h6" fontWeight="medium">
                  Near by locality
                </MDTypography>
                <div>
                  <button
                    className="addbutton btn mb-4"
                    type="button"
                    onClick={this.handleAddSocial}>
                    <span>
                      <span className="buttonText">ADD NEW</span>
                    </span>
                  </button>
                  <table className="table mt-3 bordered table-hover  white-table addNewSocial">
                    <tbody>
                      {this.state.SocialData.map((Social, idx) => (
                        <tr key={idx} className="row Social">
                          <td className="col-4 socialSelector">
                            <Select
                              className="addselect"
                              onChange={(e) => {
                                this.handleSocialNameChange(e.target.value, idx);
                              }}
                              value={Social.socialname || 'SelectOption'}
                              sx={{
                                marginTop: 18,
                                width: 200,
                                height: 45
                              }}>
                              <MenuItem>{'Select place'}</MenuItem>
                              {this.state.socialArray.map((socidata) => (
                                <MenuItem value={socidata.name} data={socidata} key={socidata.id}>
                                  {' '}
                                  {socidata.name}
                                </MenuItem>
                              ))}
                            </Select>
                          </td>

                          <td className="col-6 socialInput">
                            <MDBox mb={2}>
                              <MDTypography variant="caption" fontWeight="bold" color="error">
                                ‏‏‎ ‎ {this.state.errors.place}
                              </MDTypography>
                              <MDInput
                                type="text"
                                name="place"
                                onChange={(e) => this.handleInputVlauePlaceChange(e, idx)}
                                value={Social.place || ''}
                                label="Name of place"
                                fullWidth
                              />
                            </MDBox>
                          </td>
                          <td className="col-6 socialInput">
                            <MDBox mb={2}>
                              <MDTypography variant="caption" fontWeight="bold" color="error">
                                ‏‏‎ ‎ {this.state.errors.distance}
                              </MDTypography>
                              <MDInput
                                type="number"
                                name="distance"
                                onChange={(e) => this.handleInputVlaueChange(e, idx)}
                                value={Social.name || ''}
                                label="Distance"
                                fullWidth
                              />
                            </MDBox>
                          </td>
                          <td className="col-4 socialSelector"></td>
                          <td className="col-2 closingLink">
                            <div
                              className="fas removebutton fa-fw fa-times"
                              onClick={() => this.handleRemoveSocial(idx)}>
                              X
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </Grid>
            </Grid>
            <MDBox mt={4} mb={1}>
              <MDButton type="submit" variant="gradient" color="info" fullWidth>
                Save
              </MDButton>
            </MDBox>
          </MDBox>
        </Card>
      </MDBox>
    );
  }
}

export default Overview;
