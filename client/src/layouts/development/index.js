/* eslint-disable react/prop-types */
import React, { Component } from 'react';
import { Navigate } from 'react-router-dom';
import axios from 'axios';
// @mui material components
import { Select, MenuItem, Grid } from '@mui/material';

// Material Dashboard 2 React components
import MDTypography from 'components/MDTypography';
import MDInput from 'components/MDInput';
import MDButton from 'components/MDButton';
import MDBox from 'components/MDBox';
import burceMars from 'assets/images/userimage.webp';

// Material Dashboard 2 React example components

import { apiConstants } from '../../API/apiConstrants';
import { sweetalertsuccess, sweetalertwarning } from '../../helper/alert';
import DashboardLayout from 'examples/LayoutContainers/DashboardLayout';
import DashboardNavbar from 'examples/Navbars/DashboardNavbar';
import Footer from 'examples/Footer';

// Overview page components
import Header from 'layouts/development/components/Header';

class Overview extends Component {
  constructor(props) {
    super(props);
    this.state = {
      errors: {},
      name: '',
      plave: '',
      SocialData: [],
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
      devName: this.props.address,
      area: this.props.locality,
      zipcode: this.props.street,
      description: this.props.state,
      propertyType: this.props.city,
      buildingType: this.props.zipcode,
      completiondate: this.props.featuredProperty,
      units: this.props.units,
      floors: this.props.floors,
      areaCity: this.props.areaCity,
      developerName: this.props.developerName,
      architectName: this.props.architectName,
      website: this.props.website,
      availavility: this.props.availavility,
      developmentImage: this.props.developmentImage,
      selectedphoto: [],
      selectedphotoSingle: [],
      bannerImg: [],
      photoUrl: burceMars,
      selectedFilesdoc: [],
      selectedFiles: [],
      selectedimg: []
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
    // if (this.validate()) {
    if (this.state.selectedphoto) {
      const data = new FormData();
      for (const key of Object.keys(this.state.selectedimg)) {
        data.append('developmentImage', this.state.selectedimg[key]);
      }
      const arrayOfObj = Object.entries(this.state.selectedimg).map((e) => e[1]['name']);
      //  console.log(arrayOfObj);
      //  console.log(JSON.stringify(arrayOfObj));

      const datasingleupload = new FormData();
      datasingleupload.append('bannerImg', this.state.selectedphotoSingle);

      await axios.post(apiConstants.DEVELOPMENTBANNER_UPLOAD, datasingleupload).then(async () => {
        await axios.post(apiConstants.DEVELOPMENT_PHOTO_UPLOAD, data).then((res) => {
          if (res.data.message === 'uploaded') {
            let method;
            method = 'POST';
            let APIURL = apiConstants.ADD_DEVELOPMENT;
            var myHeaders = new Headers();
            myHeaders.append('Content-Type', 'application/json');
            var body = JSON.stringify({
              devName: this.state.devName,
              area: this.state.area,
              developmentImage: JSON.stringify(arrayOfObj),
              bannerImg: this.state.selectedphotoSingle.name,
              zipcode: this.state.zipcode,
              description: this.state.description,
              propertyType: this.state.propertyType,
              buildingType: this.state.buildingType,
              completiondate: this.state.completiondate,
              units: this.state.units,
              floors: this.state.floors,
              areaCity: this.state.areaCity,
              developerName: this.state.developerName,
              architectName: this.state.architectName,
              website: this.state.website,
              availavility: JSON.stringify(this.state.SocialData)
            });
            var requestOptions = {
              method: method,
              headers: myHeaders,
              body: body,
              redirect: 'follow'
            };
            fetch(APIURL, requestOptions)
              .then((response) => response.text())
              .then(() => this.setState({}))
              .then(sweetalertsuccess('Property added succesfully'))
              .catch((error) => console.log('error', error));
          } else {
            sweetalertwarning('Please upload property photos');
          }
        });
      });
    }
    // }
  };
  validate = () => {
    let errors = {};
    let isValid = true;
    if (!this.state.devName) {
      isValid = false;
      errors['devName'] = 'This field is required';
    }
    if (!this.state.area) {
      isValid = false;
      errors['area'] = 'This field is required';
    }
    if (!this.state.zipcode) {
      isValid = false;
      errors['zipcode'] = 'This field is required';
    }
    if (!this.state.description) {
      isValid = false;
      errors['description'] = 'This field is required';
    }

    if (!this.state.propertyType) {
      isValid = false;
      errors['propertyType'] = 'This field is required';
    }
    if (!this.state.buildingType) {
      isValid = false;
      errors['buildingType'] = 'This field is required';
    }
    if (!this.state.completiondate) {
      isValid = false;
      errors['completiondate'] = 'This field is required';
    }
    if (!this.state.units) {
      isValid = false;
      errors['units'] = 'This field is required';
    }
    if (!this.state.floors) {
      isValid = false;
      errors['floors'] = 'This field is required';
    }
    if (!this.state.areaCity) {
      isValid = false;
      errors['areaCity'] = 'This field is required';
    }
    if (!this.state.developerName) {
      isValid = false;
      errors['developerName'] = 'This field is required';
    }
    if (!this.state.areaCity) {
      isValid = false;
      errors['areaCity'] = 'This field is required';
    }
    if (!this.state.website) {
      isValid = false;
      errors['website'] = 'This field is required';
    }
    if (!this.state.availavility) {
      isValid = false;
      errors['availavility'] = 'This field is required';
    }
    if (!this.state.developmentImage) {
      isValid = false;
      errors['developmentImage'] = 'This field is required';
    }
    if (!this.state.city) {
      isValid = false;
      errors['city'] = 'This field is required';
    }
    this.setState({
      errors: errors
    });
    return isValid;
  };

  handleImageChangeSingle = async (e) => {
    this.setState({ bannerImg: [] });
    this.setState({ selectedphotoSingle: [] });
    if (this.checkMimeType(e)) {
      await this.setState({ selectedphotoSingle: e.target.files[0] }, async () =>
        this.setState({ bannerImg: e.target.files[0] })
      );

      if (this.state.selectedphotoSingle) {
        const reader = new FileReader();
        reader.onload = async (event) => {
          await this.setState({ photoUrl: event.target.result });
        };
        reader.readAsDataURL(new Blob([this.state.selectedphotoSingle]));
      }
    }
  };
  handleImageChange = async (e) => {
    if (this.maxSelectFile(e)) {
      if (e.target.files) {
        const filesArray = Array.from(e.target.files).map((file) => URL.createObjectURL(file));
        await this.setState(() => ({
          selectedFiles: this.state.selectedFiles.concat(filesArray)
        }));
        await this.setState({ selectedimg: e.target.files });
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
  };
  renderPhotos = (source) => {
    return source.map((photo, index) => {
      // console.log(photo.image_path);
      var imgesrc = '/' + photo.image_path;
      if (photo.image_path == undefined) {
        imgesrc = photo;
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

    return (
      <DashboardLayout>
        <DashboardNavbar />
        <MDBox mb={2} />
        <Header>
          <MDBox p={2}>
            <MDBox
              container
              spacing={2}
              mt={-4}
              mb={3}
              component="form"
              role="form"
              onSubmit={this.handleSubmit}>
              <Grid container spacing={6}>
                <Grid item xs={12} md={6} xl={3}>
                  <MDTypography variant="h6" fontWeight="medium">
                    Details & description
                  </MDTypography>
                  <MDBox mb={2}>
                    <MDTypography variant="caption" fontWeight="bold" color="error">
                      ‏‏‎ ‎ {this.state.errors.devName}
                    </MDTypography>
                    <MDInput
                      type="text"
                      name="devName"
                      onChange={this.handleChange}
                      value={this.state.password}
                      label="Development name"
                      fullWidth
                    />
                  </MDBox>
                  Banner image
                  <div>
                    <img className="bammerArea" src={this.state.photoUrl} />
                  </div>
                  <MDBox mb={2}>
                    <MDInput
                      type="file"
                      name="bannerImg"
                      onChange={this.handleImageChangeSingle}
                      value={this.state.bannerImg}
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
                      ‏‏‎ ‎ {this.state.errors.area}
                    </MDTypography>
                    <MDInput
                      type="text"
                      name="area"
                      onChange={this.handleChange}
                      value={this.state.area}
                      label="Area"
                      fullWidth
                    />
                  </MDBox>
                  <MDBox mb={2}>
                    <MDTypography variant="caption" fontWeight="bold" color="error">
                      ‏‏‎ ‎ {this.state.errors.zipcode}
                    </MDTypography>
                    <MDInput
                      type="number"
                      name="zipcode"
                      onChange={this.handleChange}
                      value={this.state.zipcode}
                      label="Zip code"
                      fullWidth
                    />
                  </MDBox>
                  <MDBox mb={2}>
                    <MDTypography variant="caption" fontWeight="bold" color="error">
                      ‏‏‎ ‎ {this.state.errors.description}
                    </MDTypography>
                    <MDInput
                      type="text"
                      name="description"
                      onChange={this.handleChange}
                      value={this.state.description}
                      label="Description"
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
                </Grid>
                <Grid item xs={12} md={6} xl={3}>
                  <MDTypography variant="h6" fontWeight="medium">
                    ‏‏‎ ‎
                  </MDTypography>

                  <MDBox mb={2}>
                    <MDTypography variant="caption" fontWeight="bold" color="error">
                      ‏‏‎ ‎ {this.state.errors.buildingType}
                    </MDTypography>
                    <MDInput
                      type="text"
                      name="buildingType"
                      onChange={this.handleChange}
                      value={this.state.buildingType}
                      label="Building type"
                      fullWidth
                    />
                  </MDBox>
                  <MDBox mb={2}>
                    <MDTypography variant="caption" fontWeight="bold" color="error">
                      ‏‏‎ ‎ {this.state.errors.completiondate}
                    </MDTypography>
                    <MDInput
                      type="text"
                      name="completiondate"
                      onChange={this.handleChange}
                      value={this.state.completiondate}
                      label="Copletion date"
                      fullWidth
                    />
                  </MDBox>
                  <MDBox mb={2}>
                    <MDTypography variant="caption" fontWeight="bold" color="error">
                      ‏‏‎ ‎ {this.state.errors.units}
                    </MDTypography>
                    <MDInput
                      type="text"
                      name="units"
                      onChange={this.handleChange}
                      value={this.state.units}
                      label="Units"
                      fullWidth
                    />
                  </MDBox>
                  <MDBox mb={2}>
                    <MDTypography variant="caption" fontWeight="bold" color="error">
                      ‏‏‎ ‎ {this.state.errors.floors}
                    </MDTypography>
                    <MDInput
                      type="text"
                      name="floors"
                      onChange={this.handleChange}
                      value={this.state.floors}
                      label="Floors"
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
                      ‏‏‎ ‎ {this.state.errors.areaCity}
                    </MDTypography>
                    <MDInput
                      type="text"
                      name="areaCity"
                      onChange={this.handleChange}
                      value={this.state.areaCity}
                      label="Area/City"
                      fullWidth
                    />
                  </MDBox>
                  <MDBox mb={2}>
                    <MDTypography variant="caption" fontWeight="bold" color="error">
                      ‏‏‎ ‎ {this.state.errors.developerName}
                    </MDTypography>
                    <MDInput
                      type="text"
                      name="developerName"
                      onChange={this.handleChange}
                      value={this.state.developerName}
                      label="Developer name"
                      fullWidth
                    />
                  </MDBox>
                  <MDBox mb={2}>
                    <MDTypography variant="caption" fontWeight="bold" color="error">
                      ‏‏‎ ‎ {this.state.errors.architectName}
                    </MDTypography>
                    <MDInput
                      type="text"
                      name="architectName"
                      onChange={this.handleChange}
                      value={this.state.architectName}
                      label="Architect name."
                      fullWidth
                    />
                  </MDBox>
                  <MDBox mb={2}>
                    <MDTypography variant="caption" fontWeight="bold" color="error">
                      ‏‏‎ ‎ {this.state.errors.website}
                    </MDTypography>
                    <MDInput
                      type="text"
                      name="website"
                      onChange={this.handleChange}
                      value={this.state.website}
                      label="Website"
                      fullWidth
                    />
                  </MDBox>
                </Grid>
              </Grid>

              <Grid container spacing={6}>
                <Grid item xs={12} md={6} xl={4}>
                  <MDTypography variant="h6" fontWeight="medium">
                    Upload development images
                  </MDTypography>
                  Minimum 2 images
                  <MDBox mb={2}>
                    <MDInput
                      type="file"
                      inputProps={{
                        multiple: true
                      }}
                      name="developmentImage"
                      onChange={this.handleImageChange}
                      value={this.state.developmentImage}
                      fullWidth
                    />
                  </MDBox>
                </Grid>
                <Grid item xs={12} md={6} xl={4}>
                  <MDTypography variant="h6" fontWeight="medium">
                    ‏‏‎ ‎
                  </MDTypography>
                  {this.renderPhotos(this.state.selectedFiles)}
                  {/* <DefaultProjectCard
      image={this.state.photoUrl}
      action={{}}
    /> */}
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
                    Availability
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
                            <td className="col-6 socialInput">
                              <MDBox mb={2}>
                                <MDTypography variant="caption" fontWeight="bold" color="error">
                                  ‏‏‎ ‎ {this.state.errors.market}
                                </MDTypography>
                                <MDInput
                                  type="text"
                                  name="market"
                                  onChange={(e) => this.handleInputVlaueChange(e, idx)}
                                  value={Social.name || ''}
                                  label="Market"
                                  fullWidth
                                />
                              </MDBox>
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
                                  label="Place"
                                  fullWidth
                                />
                              </MDBox>
                            </td>
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
                                {this.state.socialArray.map((socidata) => (
                                  <MenuItem value={socidata.name} data={socidata} key={socidata.id}>
                                    {' '}
                                    {socidata.name}
                                  </MenuItem>
                                ))}
                              </Select>
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
          </MDBox>
        </Header>
        <Footer />
      </DashboardLayout>
    );
  }
}

export default Overview;
