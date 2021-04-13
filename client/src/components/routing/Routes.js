import React from "react";
import { Route, Switch } from "react-router-dom";
import Register from "../users/Register";
import Login from "../users/Login";
import ForgetPassword from "../users/ForgetPassword";
import ResetPassword from "../users/ResetPassword";
import Profile from "../users/Profile";
import UpdateProfile from "../users/UpdateProfile";
import ImageCrop from "../layout/ImageCrop";
import SimpleImageCrop from "../layout/SimpleImageCrop";
//FR**08/07/2020***
import AddBoutique from "../boutiques/AddBoutique";
import BoutiquesList from "../boutiques/BoutiquesList";
import DescriptionBout from "../boutiques/DescriptionBout";
import BoutiqueUser from "../boutiques/BoutiqueUser";
import UpdateBoutique from "../boutiques/UpdateBoutique";
import UpdateProduit from "../produits/UpdateProduit";
import AddProduit from "../produits/AddProduit";
import DescrptionProd from "../produits/DescrptionProd";
import LikeList from "../like/LikeList";
import CommandList from "../commandes/CommandList";
import Chekout from "../commandes/Chekout";
import AddSection from "../sections/AddSection";
import SectionsListAdmin from "../sections/SectionsListAdmin";
import UpdateSectionAdmin from "../sections/UpdateSectionAdmin";
import AddSliderAdmin from "../sliders/AddSliderAdmin";
import SliderListAdmin from "../sliders/SliderListAdmin";
import AddUserAdmin from "../users/AddUserAdmin";
import UpdateSliderAdmin from "../sliders/UpdateSliderAdmin";
import ListUsersAdmin from "../users/ListUsersAdmin";
import UpdateUserAdmin from "../users/UpdateUserAdmin";
import AdminDashboard from "../layout/AdminDashboard";
import BoutiqueListAdmin from "../boutiques/BoutiqueListAdmin";
import UpdateBoutiqueAdmin from "../boutiques/UpdateBoutiqueAdmin";
import AddBoutiqueAdmin from "../boutiques/AddBoutiqueAdmin";
import Commande from "../commandes/CommandeUser";
import BoutiqueCommande from "../commandes/CommandeBoutique";
import CategorieList from "../categories/CategorieList";
import ProductCategorie from "../categories/ProductCategorie";
import CommandeInfo from "../commandes/CommandeInfoBout";
import CommandeInfoUser from "../commandes/CommandeInfoUser";
import productinfocategory from "../categories/productinfocategory";
import AddCategoryAdmin from "../categories/AddCategoryAdmin";
import UpdateCategoryAdmin from "../categories/UpdateCategoryAdmin";
import CategoryListAdmin from "../categories/CategoryListAdmin";
import AddCommercial from "../boutiques/AddCommercial";
import EditorBoutique from "../boutiques/EditorBoutique";
import EditorListBoutique from "../boutiques/EditorListBoutique";
import FiltredCommandeStatus from "../commandes/FiltredCommandeStatus";
import ListSectionsGlobals from "../sections/ListSectionsGlobals";
import AddSection_Type3 from "../sections/AddSection_Type3";
import AddSection_Type4 from "../sections/AddSection_Type4";
import AddSection_Type2 from "../sections/AddSection_Type2";
import AddSection_Type6 from "../sections/AddSection_Type6";
import Section_Type2 from "../sections/Section_Type2";
import Section_Type3 from "../sections/Section_Type3";
import AddSection_Type5 from "../sections/AddSection_Type5";
import SectionListAdmin2 from "../sections/SectionListAdmin2";
import SectionListAdmin3 from "../sections/SectionListAdmin3";
import SectionListAdmin4 from "../sections/SectionListAdmin4";
import SectionListeAdmin6 from "../sections/SectionListeAdmin6";
import UpdateSectionAdmin2 from "../sections/UpdateSectionAdmin2";
import UpdateSectionAdmin3 from "../sections/UpdateSectionAdmin3";
import UpdateSectionAdmin4 from "../sections/UpdateSectionAdmin4";
import TestScroll from "../boutiques/TestScroll";
import SectionListAdmin5 from "../sections/SectionListAdmin5";
import UpdateSectionAdmin5 from "../sections/UpdateSectionAdmin5";
import UpdateSectionAdmin6 from "../sections/UpdateSectionAdmin6";
import PaginatedContent from "../produits/PaginatedContent ";
import BoutiqueGros from "../boutiques/BoutiqueGros";
import BoutiqueDetail from "../boutiques/BoutiqueDetail";
import AddStatusAdmin from "../status/AddStatusAdmin";
import StatusListAdmin from "../status/StatusListAdmin";
import UpdateStatusAdmin from "../status/UpdateStatusAdmin";
import UpdateStatusBoutique from "../status/UpdateStatusBoutique";
import AddSettings from "../Settings/AddSettings";
import SettingsListAdmin from "../Settings/SettingsListAdmin";
import UpdateSettingsAdmin from "../Settings/UpdateSettingsAdmin";
import filessettinges from '../Settings/settingsfiles'

const Routes = () => {
  return (
    <div className="">
      <Switch>
        <Route exact path="/register" component={Register} />
        <Route exact path="/login" component={Login} />
        <Route exact path="/profile" component={Profile} />
        <Route exact path="/addbouitque" component={AddBoutique} />
        <Route exact path="/boutiques" component={BoutiquesList} />
        <Route exact path="/boutiqueuser" component={BoutiqueUser} />
        <Route exact path="/boutiquesgros" component={BoutiqueGros} />
        <Route exact path="/boutiquesdetail" component={BoutiqueDetail} />
        <Route exact path="/Chekout" component={Chekout} />

        <Route exact path="/updateboutique" component={UpdateBoutique} />
        <Route exact path="/like" component={LikeList} />
        <Route exact path="/boutique/:id" component={DescriptionBout} />
        <Route exact path="/product/:id" component={DescrptionProd} />
        <Route exact path="/updateproduct/:id" component={UpdateProduit} />
        <Route exact path="/commandes" component={CommandList} />
        <Route exact path="/addproduit" component={AddProduit} />
        <Route exact path="/addsection1" component={AddSection} />
        <Route exact path="/addsection3" component={AddSection_Type3} />
        <Route exact path="/addsection4" component={AddSection_Type4} />
        <Route exact path="/addsection2" component={AddSection_Type2} />
        <Route exact path="/addsection5" component={AddSection_Type5} />
        <Route exact path="/addsection6" component={AddSection_Type6} />
        <Route exact path="/sectionlist2" component={SectionListAdmin2} />
        <Route exact path="/sectionlist3" component={SectionListAdmin3} />
        <Route exact path="/sectionlist4" component={SectionListAdmin4} />
        <Route exact path="/sectionlist5" component={SectionListAdmin5} />
        <Route exact path="/sectionlist6" component={SectionListeAdmin6} />
        <Route exact path="/pagination" component={PaginatedContent} />

        <Route exact path="/updatesectionadmin2/:id" component={UpdateSectionAdmin2} />
        <Route exact path="/updatesectionadmin3/:id" component={UpdateSectionAdmin3} />
        <Route exact path="/updatesectionadmin4/:id" component={UpdateSectionAdmin4} />
        <Route exact path="/updatesectionadmin5/:id" component={UpdateSectionAdmin5} />
        <Route exact path="/updatesectionadmin6/:id" component={UpdateSectionAdmin6} />

        <Route exact path="/TestScroll" component={TestScroll} />
        <Route exact path="/sectionlistadmin" component={SectionsListAdmin} />
        <Route exact path="/updatesectionadmin/:id" component={UpdateSectionAdmin} />
        <Route exact path="/addslider" component={AddSliderAdmin} />
        <Route exact path="/sliderlistadmin" component={SliderListAdmin} />
        <Route exact path="/updateslideradmin/:id" component={UpdateSliderAdmin} />
        <Route exact path="/admin-dashboard" component={AdminDashboard} />
        <Route exact path="/add-user" component={AddUserAdmin} />
        <Route exact path="/user-list" component={ListUsersAdmin} />
        <Route exact path="/update-user/:id" component={UpdateUserAdmin} />
        <Route exact path="/update-boutique/:id" component={UpdateBoutiqueAdmin} />
        <Route exact path="/boutique-list" component={BoutiqueListAdmin} />
        <Route exact path="/add-boutique" component={AddBoutiqueAdmin} />
        <Route exact path="/commande-list-user" component={Commande} />
        <Route exact path="/info-commande-user/:id" component={CommandeInfoUser} />
        <Route exact path="/commande-boutique" component={BoutiqueCommande} />
        <Route exact path="/info-commande-boutique/:id" component={CommandeInfo} />
        <Route exact path="/categories" component={CategorieList} />
        <Route exact path="/product-category/:id" component={ProductCategorie} />
        <Route exact path="/product-info-category/:id" component={productinfocategory} />
        <Route exact path="/add-category" component={AddCategoryAdmin} />
        <Route exact path="/update-categry-admin/:id" component={UpdateCategoryAdmin} />
        <Route exact path="/category-list-admin" component={CategoryListAdmin} />
        <Route exact path="/add-commercial" component={AddCommercial} />
        <Route exact path="/Editor-boutique" component={EditorBoutique} />
        <Route exact path="/list-Editor-boutique" component={EditorListBoutique} />
        <Route exact path="/commande-friltred-status" component={FiltredCommandeStatus} />
        <Route exact path="/sections-list" component={ListSectionsGlobals} />
        <Route exact path="/section-list2" component={Section_Type2} />
        <Route exact path="/section-list3" component={Section_Type3} />

        <Route exact path="/add-status-admin" component={AddStatusAdmin} />
        <Route exact path="/Status-List-Admin" component={StatusListAdmin} />
        <Route exact path="/updatestatus/:id" component={UpdateStatusAdmin} />
        <Route exact path="/UpdateStatusBoutique/:id" component={UpdateStatusBoutique} />

        <Route exact path="/addsetting" component={AddSettings} />
        <Route exact path="/settinglist" component={SettingsListAdmin} />
        <Route exact path="/updatesettingsadmin/:id" component={UpdateSettingsAdmin} />
        <Route exact path="/filessettinges" component={filessettinges} />

        <Route exact path="/update-profile" component={UpdateProfile} />
        <Route exact path="/forget-password" component={ForgetPassword} />
        <Route path="/reset-password/:token" component={ResetPassword} />

        <Route exact path="/crop" component={ImageCrop} />
        <Route exact path="/simplecrop" component={SimpleImageCrop} />
      </Switch>
    </div>
  );
};

export default Routes;
