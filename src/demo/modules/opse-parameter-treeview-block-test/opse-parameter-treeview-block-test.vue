<template>
  <section>
    <opse-parameter-treeview-block
      :metadata="metadata1"
      :theme="theme"
      language="en"
    ></opse-parameter-treeview-block>
  </section>
</template>

<script>
import OpseParameterTreeviewBlock from "@/lib/modules/opse-parameter-treeview-block/opse-parameter-treeview-block.vue";
export default {
    name: "opse-parameter-treeview-block-test",

    components: {OpseParameterTreeviewBlock},

    data(){
        return{
        metadata1: {
        id: "9815b225-e87b-45f5-b478-bec110717a1b",
        links:[
          {"type":"OPENSEARCH_LINK","url":"https://api.sedoo.fr/","name":"","description":{"en":"Opensearch data access","fr":""}},
          ],
        "parameterSet": [
    
    {
      "thesaurusCode": "LAND_SURFACE.SOILS.SOIL_TEMPERATURE.NULL",
      "shortName": "SoilT_Well2_Shaded_140cm_degC",
      "longName": "Soil temperature Well2 _ 140cm",
      "uom": "°C",
      "comment": {
        "en": null,
        "fr": null
      },
      "type": "",
      "cfStandardName": "",
      "label": "Land Surface.Soils.Soil Temperature.null"
    },
    {
      "thesaurusCode": "LAND_SURFACE.SOILS.SOIL_TEMPERATURE.NULL",
      "shortName": "SoilT_Well2_Shaded_160cm_degC",
      "longName": "Soil temperature Well2 _ 160cm",
      "uom": "°C",
      "comment": {
        "en": null,
        "fr": null
      },
      "type": "",
      "cfStandardName": "",
      "label": "Land Surface.Soils.Soil Temperature.null"
    },
    {
      "thesaurusCode": "TERRESTRIAL_HYDROSPHERE.WATER_QUALITY_WATER_CHEMISTRY.CONDUCTIVITY.NULL",
      "shortName": "SoilEC_Well2_shaded_80cm_dSm1",
      "longName": "Soil Electrical conductivity Well2 _ 80cm",
      "uom": "DeciSiemensm-1",
      "comment": {
        "en": null,
        "fr": null
      },
      "type": "",
      "cfStandardName": "",
      "label": "TERRESTRIAL HYDROSPHERE.WATER QUALITY/WATER CHEMISTRY.CONDUCTIVITY.null"
    },
    {
      "thesaurusCode": "TERRESTRIAL_HYDROSPHERE.WATER_QUALITY_WATER_CHEMISTRY.CONDUCTIVITY.NULL",
      "shortName": "SoilEC_Well2_shaded_120cm_dSm1",
      "longName": "Soil Electrical conductivity Well2 _ 120cm",
      "uom": "DeciSiemensm-1",
      "comment": {
        "en": null,
        "fr": null
      },
      "type": "",
      "cfStandardName": "",
      "label": "TERRESTRIAL HYDROSPHERE.WATER QUALITY/WATER CHEMISTRY.CONDUCTIVITY.null"
    },
    {
      "thesaurusCode": "TERRESTRIAL_HYDROSPHERE.WATER_QUALITY_WATER_CHEMISTRY.CONDUCTIVITY.NULL",
      "shortName": "SoilEC_Well2_140cm_shaded_dSm1",
      "longName": "Soil Electrical conductivity Well2 _ 140cm",
      "uom": "DeciSiemensm-1",
      "comment": {
        "en": null,
        "fr": null
      },
      "type": "",
      "cfStandardName": "",
      "label": "TERRESTRIAL HYDROSPHERE.WATER QUALITY/WATER CHEMISTRY.CONDUCTIVITY.null"
    },
    {
      "thesaurusCode": "TERRESTRIAL_HYDROSPHERE.WATER_QUALITY_WATER_CHEMISTRY.CONDUCTIVITY.NULL",
      "shortName": "SoilEC_Well2_shaded_160cm_dSm1",
      "longName": "Soil Electrical conductivity Well2 _ 160cm",
      "uom": "DeciSiemensm-1",
      "comment": {
        "en": null,
        "fr": null
      },
      "type": "",
      "cfStandardName": "",
      "label": "TERRESTRIAL HYDROSPHERE.WATER QUALITY/WATER CHEMISTRY.CONDUCTIVITY.null"
    },
    {
      "thesaurusCode": "TERRESTRIAL_HYDROSPHERE.WATER_QUALITY_WATER_CHEMISTRY.CONDUCTIVITY.NULL",
      "shortName": "SoilEC_Well2_shaded_180cm_dSm1",
      "longName": "Soil Electrical conductivity Well2 _ 180cm",
      "uom": "DeciSiemensm-1",
      "comment": {
        "en": null,
        "fr": null
      },
      "type": "",
      "cfStandardName": "",
      "label": "TERRESTRIAL HYDROSPHERE.WATER QUALITY/WATER CHEMISTRY.CONDUCTIVITY.null"
    },
    {
      "thesaurusCode": "ATMOSPHERE.ATMOSPHERIC_WATER_VAPOR.WATER_VAPOR_INDICATORS.HUMIDITY",
      "shortName": "SoilVWC_Well2_Shaded_20cm_fractCal",
      "longName": "Soil volumetric humidity Well2 _ 20cm",
      "uom": "m3H2O m-3soil",
      "comment": {
        "en": null,
        "fr": null
      },
      "type": "",
      "cfStandardName": "",
      "label": "ATMOSPHERE.ATMOSPHERIC_WATER_VAPOR.WATER_VAPOR_INDICATORS.HUMIDITY"
    },
    {
      "thesaurusCode": "ATMOSPHERE.ATMOSPHERIC_WATER_VAPOR.WATER_VAPOR_INDICATORS.HUMIDITY",
      "shortName": "SoilVWC_Well2_Shaded_40cm_fractCal",
      "longName": "Soil volumetric humidity Well2 _ 40cm",
      "uom": "m3H2O m-3soil",
      "comment": {
        "en": null,
        "fr": null
      },
      "type": "",
      "cfStandardName": "",
      "label": "ATMOSPHERE.ATMOSPHERIC_WATER_VAPOR.WATER_VAPOR_INDICATORS.HUMIDITY"
    },
    {
      "thesaurusCode": "ATMOSPHERE.ATMOSPHERIC_WATER_VAPOR.WATER_VAPOR_INDICATORS.HUMIDITY",
      "shortName": "SoilVWC_Well2_Shaded_60cm_fractCal",
      "longName": "Soil volumetric humidity Well2 _ 60cm",
      "uom": "m3H2O m-3soil",
      "comment": {
        "en": null,
        "fr": null
      },
      "type": "",
      "cfStandardName": "",
      "label": "ATMOSPHERE.ATMOSPHERIC_WATER_VAPOR.WATER_VAPOR_INDICATORS.HUMIDITY"
    },
    {
      "thesaurusCode": "ATMOSPHERE.ATMOSPHERIC_WATER_VAPOR.WATER_VAPOR_INDICATORS.HUMIDITY",
      "shortName": "SoilVWC_Well2_Shaded_80cm_fractCal",
      "longName": "Soil volumetric humidity Well2 _ 80cm",
      "uom": "m3H2O m-3soil",
      "comment": {
        "en": null,
        "fr": null
      },
      "type": "",
      "cfStandardName": "",
      "label": "ATMOSPHERE.ATMOSPHERIC_WATER_VAPOR.WATER_VAPOR_INDICATORS.HUMIDITY"
    },
    {
      "thesaurusCode": "ATMOSPHERE.ATMOSPHERIC_WATER_VAPOR.WATER_VAPOR_INDICATORS.HUMIDITY",
      "shortName": "SoilVWC_Well2_Shaded_120cm_fractCal",
      "longName": "Soil volumetric humidity Well2 _ 120cm",
      "uom": "m3H2O m-3soil",
      "comment": {
        "en": null,
        "fr": null
      },
      "type": "",
      "cfStandardName": "",
      "label": "ATMOSPHERE.ATMOSPHERIC_WATER_VAPOR.WATER_VAPOR_INDICATORS.HUMIDITY"
    },
    {
      "thesaurusCode": "ATMOSPHERE.ATMOSPHERIC_WATER_VAPOR.WATER_VAPOR_INDICATORS.HUMIDITY",
      "shortName": "SoilVWC_Well2_Shaded_140cm_fractCal",
      "longName": "Soil volumetric humidity Well2 _ 140cm",
      "uom": "m3H2O m-3soil",
      "comment": {
        "en": null,
        "fr": null
      },
      "type": "",
      "cfStandardName": "",
      "label": "ATMOSPHERE.ATMOSPHERIC_WATER_VAPOR.WATER_VAPOR_INDICATORS.HUMIDITY"
    },
    {
      "thesaurusCode": "ATMOSPHERE.ATMOSPHERIC_WATER_VAPOR.WATER_VAPOR_INDICATORS.HUMIDITY",
      "shortName": "SoilVWC_Well2_Shaded_160cm_fractCal",
      "longName": "Soil volumetric humidity Well2 _ 160cm",
      "uom": "m3H2O m-3soil",
      "comment": {
        "en": null,
        "fr": null
      },
      "type": "",
      "cfStandardName": "",
      "label": "ATMOSPHERE.ATMOSPHERIC_WATER_VAPOR.WATER_VAPOR_INDICATORS.HUMIDITY"
    },
    {
      "thesaurusCode": "ATMOSPHERE.ATMOSPHERIC_WATER_VAPOR.WATER_VAPOR_INDICATORS.HUMIDITY",
      "shortName": "SoilVWC_Well2_Shaded_180cm_fractCal",
      "longName": "Soil volumetric humidity Well2 _ 180cm",
      "uom": "m3H2O m-3soil",
      "comment": {
        "en": null,
        "fr": null
      },
      "type": "",
      "cfStandardName": "",
      "label": "ATMOSPHERE.ATMOSPHERIC_WATER_VAPOR.WATER_VAPOR_INDICATORS.HUMIDITY"
    },
    {
      "thesaurusCode": "ATMOSPHERE.ATMOSPHERIC_WATER_VAPOR.WATER_VAPOR_INDICATORS.HUMIDITY",
      "shortName": "SoilVWC_Well2_Shaded_280cm_fractUncal",
      "longName": "Soil volumetric humidity Well2 _ 280cm",
      "uom": "m3H2O m-3soil",
      "comment": {
        "en": null,
        "fr": null
      },
      "type": "",
      "cfStandardName": "",
      "label": "ATMOSPHERE.ATMOSPHERIC_WATER_VAPOR.WATER_VAPOR_INDICATORS.HUMIDITY"
    },
    {
      "thesaurusCode": "ATMOSPHERE.ATMOSPHERIC_WATER_VAPOR.WATER_VAPOR_INDICATORS.HUMIDITY",
      "shortName": "SoilVWC_Well2_Shaded_380cm_fractUncal",
      "longName": "Soil volumetric humidity Well2 _ 380cm",
      "uom": "m3H2O m-3soil",
      "comment": {
        "en": null,
        "fr": null
      },
      "type": "",
      "cfStandardName": "",
      "label": "ATMOSPHERE.ATMOSPHERIC_WATER_VAPOR.WATER_VAPOR_INDICATORS.HUMIDITY"
    },
    {
      "thesaurusCode": "ATMOSPHERE.ATMOSPHERIC_WATER_VAPOR.WATER_VAPOR_INDICATORS.HUMIDITY",
      "shortName": "SoilVWC_Well2_Shaded_480cm_fractUncal",
      "longName": "Soil volumetric humidity Well2 _ 480cm",
      "uom": "m3H2O m-3soil",
      "comment": {
        "en": null,
        "fr": null
      },
      "type": "",
      "cfStandardName": "",
      "label": "ATMOSPHERE.ATMOSPHERIC_WATER_VAPOR.WATER_VAPOR_INDICATORS.HUMIDITY"
    },
    {
      "thesaurusCode": "LAND_SURFACE.SOILS.SOIL_TEMPERATURE.NULL",
      "shortName": "SoilT_Well5_Shaded_10cm_degC",
      "longName": "Soil temperature Well5 _ 10cm",
      "uom": "°C",
      "comment": {
        "en": null,
        "fr": null
      },
      "type": "",
      "cfStandardName": "",
      "label": "Land Surface.Soils.Soil Temperature.null"
    },
    {
      "thesaurusCode": "LAND_SURFACE.SOILS.SOIL_TEMPERATURE.NULL",
      "shortName": "SoilT_Well5_Shaded_20cm_degC",
      "longName": "Soil temperature Well5 _ 20cm",
      "uom": "°C",
      "comment": {
        "en": null,
        "fr": null
      },
      "type": "",
      "cfStandardName": "",
      "label": "Land Surface.Soils.Soil Temperature.null"
    },
    {
      "thesaurusCode": "LAND_SURFACE.SOILS.SOIL_TEMPERATURE.NULL",
      "shortName": "SoilT_Well5_Shaded_40cm_degC",
      "longName": "Soil temperature Well5 _ 40cm",
      "uom": "°C",
      "comment": {
        "en": null,
        "fr": null
      },
      "type": "",
      "cfStandardName": "",
      "label": "Land Surface.Soils.Soil Temperature.null"
    },
    {
      "thesaurusCode": "LAND_SURFACE.SOILS.SOIL_TEMPERATURE.NULL",
      "shortName": "SoilT_Well5_Shaded_60cm_degC",
      "longName": "Soil temperature Well5 _ 60cm",
      "uom": "°C",
      "comment": {
        "en": null,
        "fr": null
      },
      "type": "",
      "cfStandardName": "",
      "label": "Land Surface.Soils.Soil Temperature.null"
    },
    {
      "thesaurusCode": "LAND_SURFACE.SOILS.SOIL_TEMPERATURE.NULL",
      "shortName": "SoilT_Well5_Shaded_80cm_degC",
      "longName": "Soil temperature Well5 _ 80cm",
      "uom": "°C",
      "comment": {
        "en": null,
        "fr": null
      },
      "type": "",
      "cfStandardName": "",
      "label": "Land Surface.Soils.Soil Temperature.null"
    },
    {
      "thesaurusCode": "LAND_SURFACE.SOILS.SOIL_TEMPERATURE.NULL",
      "shortName": "SoilT_Well5_Shaded_120cm_degC",
      "longName": "Soil temperature Well5 _ 120cm",
      "uom": "°C",
      "comment": {
        "en": null,
        "fr": null
      },
      "type": "",
      "cfStandardName": "",
      "label": "Land Surface.Soils.Soil Temperature.null"
    },
    {
      "thesaurusCode": "LAND_SURFACE.SOILS.SOIL_TEMPERATURE.NULL",
      "shortName": "SoilT_Well5_Shaded_140cm_degC",
      "longName": "Soil temperature Well5 _ 140cm",
      "uom": "°C",
      "comment": {
        "en": null,
        "fr": null
      },
      "type": "",
      "cfStandardName": "",
      "label": "Land Surface.Soils.Soil Temperature.null"
    },
    {
      "thesaurusCode": "LAND_SURFACE.SOILS.SOIL_TEMPERATURE.NULL",
      "shortName": "SoilT_Well5_Shaded_160cm_degC",
      "longName": "Soil temperature Well5 _ 160cm",
      "uom": "°C",
      "comment": {
        "en": null,
        "fr": null
      },
      "type": "",
      "cfStandardName": "",
      "label": "Land Surface.Soils.Soil Temperature.null"
    },
    {
      "thesaurusCode": "LAND_SURFACE.SOILS.SOIL_TEMPERATURE.NULL",
      "shortName": "SoilT_Well5_Shaded_180cm_degC",
      "longName": "Soil temperature Well5 _ 180cm",
      "uom": "°C",
      "comment": {
        "en": null,
        "fr": null
      },
      "type": "",
      "cfStandardName": "",
      "label": "Land Surface.Soils.Soil Temperature.null"
    },
    {
      "thesaurusCode": "LAND_SURFACE.SOILS.SOIL_TEMPERATURE.NULL",
      "shortName": "SoilT_Well5_Shaded_260cm_degC",
      "longName": "Soil temperature Well5 _ 260cm",
      "uom": "°C",
      "comment": {
        "en": null,
        "fr": null
      },
      "type": "",
      "cfStandardName": "",
      "label": "Land Surface.Soils.Soil Temperature.null"
    },
    {
      "thesaurusCode": "LAND_SURFACE.SOILS.SOIL_TEMPERATURE.NULL",
      "shortName": "SoilT_Well5_Shaded_360cm_degC",
      "longName": "Soil temperature Well5 _ 360cm",
      "uom": "°C",
      "comment": {
        "en": null,
        "fr": null
      },
      "type": "",
      "cfStandardName": "",
      "label": "Land Surface.Soils.Soil Temperature.null"
    },
    {
      "thesaurusCode": "LAND_SURFACE.SOILS.SOIL_TEMPERATURE.NULL",
      "shortName": "SoilT_Well5_Shaded_460cm_degC",
      "longName": "Soil temperature Well5 _ 460cm",
      "uom": "°C",
      "comment": {
        "en": null,
        "fr": null
      },
      "type": "",
      "cfStandardName": "",
      "label": "Land Surface.Soils.Soil Temperature.null"
    },
    {
      "thesaurusCode": "TERRESTRIAL_HYDROSPHERE.WATER_QUALITY_WATER_CHEMISTRY.CONDUCTIVITY.NULL",
      "shortName": "SoilEC_Well5_Shaded_10cm_dSm1",
      "longName": "Soil Electrical conductivity Well5 _ 10cm",
      "uom": "DeciSiemensm-1",
      "comment": {
        "en": null,
        "fr": null
      },
      "type": "",
      "cfStandardName": "",
      "label": "TERRESTRIAL HYDROSPHERE.WATER QUALITY/WATER CHEMISTRY.CONDUCTIVITY.null"
    },
    {
      "thesaurusCode": "TERRESTRIAL_HYDROSPHERE.WATER_QUALITY_WATER_CHEMISTRY.CONDUCTIVITY.NULL",
      "shortName": "SoilEC_Well5_Shaded_20cm_dSm1",
      "longName": "Soil Electrical conductivity Well5 _ 20cm",
      "uom": "DeciSiemensm-1",
      "comment": {
        "en": null,
        "fr": null
      },
      "type": "",
      "cfStandardName": "",
      "label": "TERRESTRIAL HYDROSPHERE.WATER QUALITY/WATER CHEMISTRY.CONDUCTIVITY.null"
    },
    {
      "thesaurusCode": "TERRESTRIAL_HYDROSPHERE.WATER_QUALITY_WATER_CHEMISTRY.CONDUCTIVITY.NULL",
      "shortName": "SoilEC_Well5_Shaded_40cm_dSm1",
      "longName": "Soil Electrical conductivity Well5 _ 40cm",
      "uom": "DeciSiemensm-1",
      "comment": {
        "en": null,
        "fr": null
      },
      "type": "",
      "cfStandardName": "",
      "label": "TERRESTRIAL HYDROSPHERE.WATER QUALITY/WATER CHEMISTRY.CONDUCTIVITY.null"
    },
    {
      "thesaurusCode": "TERRESTRIAL_HYDROSPHERE.WATER_QUALITY_WATER_CHEMISTRY.CONDUCTIVITY.NULL",
      "shortName": "SoilEC_Well5_Shaded_60cm_dSm1",
      "longName": "Soil Electrical conductivity Well5 _ 60cm",
      "uom": "DeciSiemensm-1",
      "comment": {
        "en": null,
        "fr": null
      },
      "type": "",
      "cfStandardName": "",
      "label": "TERRESTRIAL HYDROSPHERE.WATER QUALITY/WATER CHEMISTRY.CONDUCTIVITY.null"
    },
    {
      "thesaurusCode": "TERRESTRIAL_HYDROSPHERE.WATER_QUALITY_WATER_CHEMISTRY.CONDUCTIVITY.NULL",
      "shortName": "SoilEC_Well5_Shaded_80cm_dSm1",
      "longName": "Soil Electrical conductivity Well5 _ 80cm",
      "uom": "DeciSiemensm-1",
      "comment": {
        "en": null,
        "fr": null
      },
      "type": "",
      "cfStandardName": "",
      "label": "TERRESTRIAL HYDROSPHERE.WATER QUALITY/WATER CHEMISTRY.CONDUCTIVITY.null"
    },
    {
      "thesaurusCode": "TERRESTRIAL_HYDROSPHERE.WATER_QUALITY_WATER_CHEMISTRY.CONDUCTIVITY.NULL",
      "shortName": "SoilEC_Well5_Shaded_120cm_dSm1",
      "longName": "Soil Electrical conductivity Well5 _ 120cm",
      "uom": "DeciSiemensm-1",
      "comment": {
        "en": null,
        "fr": null
      },
      "type": "",
      "cfStandardName": "",
      "label": "TERRESTRIAL HYDROSPHERE.WATER QUALITY/WATER CHEMISTRY.CONDUCTIVITY.null"
    },
    {
      "thesaurusCode": "TERRESTRIAL_HYDROSPHERE.WATER_QUALITY_WATER_CHEMISTRY.CONDUCTIVITY.NULL",
      "shortName": "SoilEC_Well5_Shaded_140cm_dSm1",
      "longName": "Soil Electrical conductivity Well5 _ 140cm",
      "uom": "DeciSiemensm-1",
      "comment": {
        "en": null,
        "fr": null
      },
      "type": "",
      "cfStandardName": "",
      "label": "TERRESTRIAL HYDROSPHERE.WATER QUALITY/WATER CHEMISTRY.CONDUCTIVITY.null"
    },
    {
      "thesaurusCode": "TERRESTRIAL_HYDROSPHERE.WATER_QUALITY_WATER_CHEMISTRY.CONDUCTIVITY.NULL",
      "shortName": "SoilEC_Well5_Shaded_160cm_dSm1",
      "longName": "Soil Electrical conductivity Well5 _ 160cm",
      "uom": "DeciSiemensm-1",
      "comment": {
        "en": null,
        "fr": null
      },
      "type": "",
      "cfStandardName": "",
      "label": "TERRESTRIAL HYDROSPHERE.WATER QUALITY/WATER CHEMISTRY.CONDUCTIVITY.null"
    },
    {
      "thesaurusCode": "TERRESTRIAL_HYDROSPHERE.WATER_QUALITY_WATER_CHEMISTRY.CONDUCTIVITY.NULL",
      "shortName": "SoilEC_Well5_Shaded_180cm_dSm1",
      "longName": "Soil Electrical conductivity Well5 _ 180cm",
      "uom": "DeciSiemensm-1",
      "comment": {
        "en": null,
        "fr": null
      },
      "type": "",
      "cfStandardName": "",
      "label": "TERRESTRIAL HYDROSPHERE.WATER QUALITY/WATER CHEMISTRY.CONDUCTIVITY.null"
    },
    {
      "thesaurusCode": "TERRESTRIAL_HYDROSPHERE.WATER_QUALITY_WATER_CHEMISTRY.CONDUCTIVITY.NULL",
      "shortName": "SoilEC_Well5_Shaded_260cm_dSm1",
      "longName": "Soil Electrical conductivity Well5 _ 260cm",
      "uom": "DeciSiemensm-1",
      "comment": {
        "en": null,
        "fr": null
      },
      "type": "",
      "cfStandardName": "",
      "label": "TERRESTRIAL HYDROSPHERE.WATER QUALITY/WATER CHEMISTRY.CONDUCTIVITY.null"
    },
    {
      "thesaurusCode": "TERRESTRIAL_HYDROSPHERE.WATER_QUALITY_WATER_CHEMISTRY.CONDUCTIVITY.NULL",
      "shortName": "SoilEC_Well5_Shaded_360cm_dSm1",
      "longName": "Soil Electrical conductivity Well5 _ 360cm",
      "uom": "DeciSiemensm-1",
      "comment": {
        "en": null,
        "fr": null
      },
      "type": "",
      "cfStandardName": "",
      "label": "TERRESTRIAL HYDROSPHERE.WATER QUALITY/WATER CHEMISTRY.CONDUCTIVITY.null"
    },
    {
      "thesaurusCode": "TERRESTRIAL_HYDROSPHERE.WATER_QUALITY_WATER_CHEMISTRY.CONDUCTIVITY.NULL",
      "shortName": "SoilEC_Well5_Shaded_460cm_dSm1",
      "longName": "Soil Electrical conductivity Well5 _ 460cm",
      "uom": "DeciSiemensm-1",
      "comment": {
        "en": null,
        "fr": null
      },
      "type": "",
      "cfStandardName": "",
      "label": "TERRESTRIAL HYDROSPHERE.WATER QUALITY/WATER CHEMISTRY.CONDUCTIVITY.null"
    },
    {
      "thesaurusCode": "ATMOSPHERE.ATMOSPHERIC_WATER_VAPOR.WATER_VAPOR_INDICATORS.HUMIDITY",
      "shortName": "SoilVWC_Well5_Shaded_10cm_fractCal",
      "longName": "Soil volumetric humidity Well5 _ 10cm",
      "uom": "m3H2O m-3soil",
      "comment": {
        "en": null,
        "fr": null
      },
      "type": "",
      "cfStandardName": "",
      "label": "ATMOSPHERE.ATMOSPHERIC_WATER_VAPOR.WATER_VAPOR_INDICATORS.HUMIDITY"
    },
    {
      "thesaurusCode": "ATMOSPHERE.ATMOSPHERIC_WATER_VAPOR.WATER_VAPOR_INDICATORS.HUMIDITY",
      "shortName": "SoilVWC_Well5_Shaded_20cm_fractCal",
      "longName": "Soil volumetric humidity Well5 _ 20cm",
      "uom": "m3H2O m-3soil",
      "comment": {
        "en": null,
        "fr": null
      },
      "type": "",
      "cfStandardName": "",
      "label": "ATMOSPHERE.ATMOSPHERIC_WATER_VAPOR.WATER_VAPOR_INDICATORS.HUMIDITY"
    },
    {
      "thesaurusCode": "ATMOSPHERE.ATMOSPHERIC_WATER_VAPOR.WATER_VAPOR_INDICATORS.HUMIDITY",
      "shortName": "SoilVWC_Well5_Shaded_40cm_fractCal",
      "longName": "Soil volumetric humidity Well5 _ 40cm",
      "uom": "m3H2O m-3soil",
      "comment": {
        "en": null,
        "fr": null
      },
      "type": "",
      "cfStandardName": "",
      "label": "ATMOSPHERE.ATMOSPHERIC_WATER_VAPOR.WATER_VAPOR_INDICATORS.HUMIDITY"
    },
    {
      "thesaurusCode": "ATMOSPHERE.ATMOSPHERIC_WATER_VAPOR.WATER_VAPOR_INDICATORS.HUMIDITY",
      "shortName": "SoilVWC_Well5_Shaded_60cm_fractCal",
      "longName": "Soil volumetric humidity Well5 _ 60cm",
      "uom": "m3H2O m-3soil",
      "comment": {
        "en": null,
        "fr": null
      },
      "type": "",
      "cfStandardName": "",
      "label": "ATMOSPHERE.ATMOSPHERIC_WATER_VAPOR.WATER_VAPOR_INDICATORS.HUMIDITY"
    },
    {
      "thesaurusCode": "ATMOSPHERE.ATMOSPHERIC_WATER_VAPOR.WATER_VAPOR_INDICATORS.HUMIDITY",
      "shortName": "SoilVWC_Well5_Shaded_80cm_fractCal",
      "longName": "Soil volumetric humidity Well5 _ 80cm",
      "uom": "m3H2O m-3soil",
      "comment": {
        "en": null,
        "fr": null
      },
      "type": "",
      "cfStandardName": "",
      "label": "ATMOSPHERE.ATMOSPHERIC_WATER_VAPOR.WATER_VAPOR_INDICATORS.HUMIDITY"
    },
    {
      "thesaurusCode": "ATMOSPHERE.ATMOSPHERIC_WATER_VAPOR.WATER_VAPOR_INDICATORS.HUMIDITY",
      "shortName": "SoilVWC_Well5_Shaded_120cm_fractCal",
      "longName": "Soil volumetric humidity Well5 _ 120cm",
      "uom": "m3H2O m-3soil",
      "comment": {
        "en": null,
        "fr": null
      },
      "type": "",
      "cfStandardName": "",
      "label": "ATMOSPHERE.ATMOSPHERIC_WATER_VAPOR.WATER_VAPOR_INDICATORS.HUMIDITY"
    },
    {
      "thesaurusCode": "ATMOSPHERE.ATMOSPHERIC_WATER_VAPOR.WATER_VAPOR_INDICATORS.HUMIDITY",
      "shortName": "SoilVWC_Well5_Shaded_140cm_fractCal",
      "longName": "Soil volumetric humidity Well5 _ 140cm",
      "uom": "m3H2O m-3soil",
      "comment": {
        "en": null,
        "fr": null
      },
      "type": "",
      "cfStandardName": "",
      "label": "ATMOSPHERE.ATMOSPHERIC_WATER_VAPOR.WATER_VAPOR_INDICATORS.HUMIDITY"
    },
    {
      "thesaurusCode": "ATMOSPHERE.ATMOSPHERIC_WATER_VAPOR.WATER_VAPOR_INDICATORS.HUMIDITY",
      "shortName": "SoilVWC_Well5_Shaded_160cm_fractCal",
      "longName": "Soil volumetric humidity Well5 _ 160cm",
      "uom": "m3H2O m-3soil",
      "comment": {
        "en": null,
        "fr": null
      },
      "type": "",
      "cfStandardName": "",
      "label": "ATMOSPHERE.ATMOSPHERIC_WATER_VAPOR.WATER_VAPOR_INDICATORS.HUMIDITY"
    },
    {
      "thesaurusCode": "ATMOSPHERE.ATMOSPHERIC_WATER_VAPOR.WATER_VAPOR_INDICATORS.HUMIDITY",
      "shortName": "SoilVWC_Well5_Shaded_180cm_fractCal",
      "longName": "Soil volumetric humidity Well5 _ 180cm",
      "uom": "m3H2O m-3soil",
      "comment": {
        "en": null,
        "fr": null
      },
      "type": "",
      "cfStandardName": "",
      "label": "ATMOSPHERE.ATMOSPHERIC_WATER_VAPOR.WATER_VAPOR_INDICATORS.HUMIDITY"
    },
    {
      "thesaurusCode": "ATMOSPHERE.ATMOSPHERIC_WATER_VAPOR.WATER_VAPOR_INDICATORS.HUMIDITY",
      "shortName": "SoilVWC_Well5_Shaded_260cm_fractCal",
      "longName": "Soil volumetric humidity Well5 _ 260cm",
      "uom": "m3H2O m-3soil",
      "comment": {
        "en": null,
        "fr": null
      },
      "type": "",
      "cfStandardName": "",
      "label": "ATMOSPHERE.ATMOSPHERIC_WATER_VAPOR.WATER_VAPOR_INDICATORS.HUMIDITY"
    },
    {
      "thesaurusCode": "ATMOSPHERE.ATMOSPHERIC_WATER_VAPOR.WATER_VAPOR_INDICATORS.HUMIDITY",
      "shortName": "SoilVWC_Well5_Shaded_360cm_fractCal",
      "longName": "Soil volumetric humidity Well5 _ 360cm",
      "uom": "m3H2O m-3soil",
      "comment": {
        "en": null,
        "fr": null
      },
      "type": "",
      "cfStandardName": "",
      "label": "ATMOSPHERE.ATMOSPHERIC_WATER_VAPOR.WATER_VAPOR_INDICATORS.HUMIDITY"
    },
    {
      "thesaurusCode": "ATMOSPHERE.ATMOSPHERIC_WATER_VAPOR.WATER_VAPOR_INDICATORS.HUMIDITY",
      "shortName": "SoilVWC_Well5_Shaded_460cm_fractCal",
      "longName": "Soil volumetric humidity Well5 _ 460cm",
      "uom": "m3H2O m-3soil",
      "comment": {
        "en": null,
        "fr": null
      },
      "type": "",
      "cfStandardName": "",
      "label": "ATMOSPHERE.ATMOSPHERIC_WATER_VAPOR.WATER_VAPOR_INDICATORS.HUMIDITY"
    },
    {
      "thesaurusCode": "OCEANS.WATER_QUALITY.NULL.NULL",
      "shortName": "SoilPotential_TEROS_Well5_Shaded_20cm_kPa",
      "longName": "Soil water potential",
      "uom": "kPa",
      "comment": {
        "en": null,
        "fr": null
      },
      "type": "",
      "cfStandardName": "",
      "label": "OCEANS.WATER QUALITY.null.null"
    },
    {
      "thesaurusCode": "LAND_SURFACE.SOILS.SOIL_TEMPERATURE.NULL",
      "shortName": "SoilT_TEROS_Well5_Shaded_20cm_degC",
      "longName": "soil temperature",
      "uom": "°C",
      "comment": {
        "en": null,
        "fr": null
      },
      "type": "",
      "cfStandardName": "",
      "label": "Land Surface.Soils.Soil Temperature.null"
    }
  ],
        },
        theme: {
        primaryColor: "#f39c12",
        secondaryColor: "#AAA"
      }
        };
    }
    
}
</script>