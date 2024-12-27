import { useContext, createContext, useState } from "react";


 const MapDetailsContext = createContext()
export const MapDetailsContextProvider = function({ children }) {
    


    // const [ points, setPoints ] = useState(list)

    const m = [ "Virac", "San Miguel", "San Andres", "Bato", "Bagamanoc", "Pandan", "Caramoran", "Viga", "Baras", "Panganiban"]
    const areas = [
        {
            brgy: "Datag",
            municipal: "San Andres",
            coordinates: [13.612690, 124.074964],
            near: {
                name: "Datag Elementary School",
                coordinates: [13.6102976, 124.0765030]
            }
        },
        {
            brgy: "Alibuag",
            municipal: "San Andres",
            coordinates: [13.605415, 124.081241],
            near: {
                name: "Alibuag Bridge",
                coordinates: [13.609256, 124.078579]
            }
        },
        {
            brgy: "Comagaycay",
            municipal: "San Andres",
            coordinates: [13.602851, 124.087086],
            near: {
                name: "Comagaycay Elementary School",
                coordinates: [13.602298, 124.086959]
            }
        },
        {
            brgy: "Batong Paloway",
            municipal: "San Andres",
            coordinates: [13.602730, 124.092641],
            near: {
                name: "The Church of Jesus Christ of Latter",
                coordinates: [13.601048, 124.093341]
            }
        },
        {
            brgy: "Divino Rostro",
            municipal: "San Andres",
            coordinates: [13.600092, 124.095936],
            near: {
                name: "Casa Duena Traveller's Inn",
                coordinates: [13.599121, 124.095788],
            }
        },
        {
            brgy: "Divino Rostro Poblacion",
            municipal: "San Andres",
            coordinates: [13.598365, 124.096986],
            near: {
                name: "San Andres Terminal",
                coordinates: [13.597705, 124.096913]
            }
        },
        {
            brgy: "Sapang Palay",
            municipal: "San Andres",
            coordinates: [13.598194, 124.098642],
            near: {
                name: "Gianan Funeral Homes",
                coordinates: [13.597680, 124.099162]
            }
        },
        {
            brgy: "Belmonte",
            municipal: "San Andres",
            coordinates: [13.597119, 124.102301],
            near: {
                name: "Power Zone",
                coordinates: [13.596825, 124.101072]
            }
        },
        {
            brgy: "Carangag road",
            municipal: "San Andres",
            coordinates: [13.597704, 124.103537],
            near: null
        },
        {
            brgy: "Belmonte",
            municipal: "San Andres",
            coordinates: [13.598366, 124.108825],
            near: {
                name: "Juan M Alberto Memorial District Hospital",
                coordinates: [13.598366, 124.108825]
            }
        },
        {
            brgy: "Timbaan",
            municipal: "San Andres",
            coordinates: [13.599701, 124.115701],
            near: null
        },
        {
            brgy: "Lictin",
            municipal: "San Andres",
            coordinates: [ 13.601860, 124.126398],
            near: {
                name: "Lictin Barangay Plaza",
                coordinates: [ 13.601532, 124.130064 ]
            }
        },
        {
            brgy: "Lictin",
            municipal: "San Andres",
            coordinates: [13.601860, 124.126398],
            near: {
                name: "Luyang Cave Park",
                coordinates: [13.605211, 124.135275]
            }
        },
        {
            brgy: "Lictin",
            municipal: "San Andres",
            coordinates: [13.603001, 124.141519],
            near: {
                name: "Feliz Montana Camping and Resort",
                coordinates: [ 13.606620, 124.137432 ]
            }
        },
        {
            brgy: "Rizal",
            municipal: "San Andres",
            coordinates: [13.599646, 124.147115],
            near: null
        },
        {
            brgy: "Palta Small",
            municipal: "Virac",
            coordinates: [13.590948, 124.158125,],
            near: null
        },
        {
            brgy: "Palta Small",
            municipal: "Virac",
            coordinates: [13.586022, 124.162899],
            near: {
                coordinates: [13.586156, 124.160842],
                name: "Palta Small Chapel"
            }
        },
        {
            brgy: "San Jose",
            municipal: "San Andres",
            coordinates: [13.603001, 124.141519],
            near: null
        },
        {
            brgy: "Santo Cristo",
            municipal: "Virac",
            coordinates: [13.586873, 124.172498],
            near: {
                coordinates: [13.587343, 124.173788],
                name: "Calabnigan Road"
            }
        }, 
        {
            brgy: "Santo Domingo",
            municipal: "Virac",
            coordinates: [13.589815, 124.181792],
            near: {
                coordinates: [13.590607, 124.185266],
                name: "Marcos Bridge"
            }
        }, 
        {
            brgy: "Bigaa",
            municipal: "Virac",
            coordinates: [13.590579, 124.192630],
            near: null
        }, 
        {
            brgy: "Calatagan Proper (Main Road)",
            municipal: "Virac",
            coordinates: [13.585113, 124.206423],
            near: {
                coordinates: [13.588116, 124.204638],
                name: "Calatagan Highschool"
            }
        }, 
        {
            brgy: "Calatagan Proper",
            municipal: "Virac",
            coordinates: [13.585932, 124.208367],
            near: {
                coordinates: [13.585932, 124.208367],
                name: "Calatagan Proper Plaza"
            }
        }, 
        {
            brgy: "Calatagan (Main Road)",
            municipal: "Virac",
            coordinates: [13.582702, 124.209820],
            near: {
                coordinates: [13.583250, 124.210179],
                name: "Catanduanes State University"
            }
        }, 
        {
            brgy: "Gogon (Centro)",
            municipal: "Virac",
            coordinates: [13.580261, 124.217705],
            near: {
                coordinates: [13.580471, 124.220119],
                name: "Eastern Bicol Medical Center Hospital"
            }
        }, 
        {
            brgy: "Gogon Sirangan",
            municipal: "Virac",
            coordinates: [13.578337, 124.225317],
            near: {
                coordinates: [13.579865, 124.228578],
                name: "Virac Town Center"
            }
        }, 
        {
            brgy: "San Isidro Village",
            municipal: "Virac",
            coordinates: [13.567225, 124.203096],
            near: {
                coordinates: [13.565866, 124.204764],
                name: "Pajo San Isidro Elementary School"
            }
        }, 
        {
            brgy: "Pajo Bagiuo",
            municipal: "Virac",
            coordinates: [13.560415, 124.199614],
            near: {
                coordinates: [13.558605, 124.199834],
                name: "Pajo Bagiuo Elementary School"
            }
        }, 
        {
            brgy: "Conception st.",
            municipal: "Virac",
            coordinates: [13.578711, 124.229641],
            near: {
                coordinates: [13.578534, 124.229855],
                name: "Lucky Hotel and Resort"
            }
        }, 
        {
            brgy: "Catanduanes Circumferential Road",
            municipal: "Virac",
            coordinates: [13.580313, 124.231003],
            near: {
                coordinates: [13.579731, 124.231153],
                name: "Plaza Rizal"
            }
        }, 
        {
            brgy: "Rizal Ave",
            municipal: "Virac",
            coordinates: [13.582375, 124.232190],
            near: {
                coordinates: [13.582793, 124.232587],
                name: "Catanduanes Midtown Inn"
            }
        }, 
        {
            brgy: "Sta. Elena",
            municipal: "Virac",
            coordinates: [13.584373, 124.235008],
            near: {
                coordinates: [13.584480, 124.235075],
                name: "Catanduanes Old Capitol Building"
            }
        }, 
        {
            brgy: "Catanduanes Circumferential Road",
            municipal: "Virac",
            coordinates: [13.584828, 124.235749],
            near: {
                coordinates: [13.585482, 124.236917],
                name: "J.Aldea St."
            }
        }, 
        {
            brgy: "Capilihan",
            municipal: "Virac",
            coordinates: [13.588136, 124.240596],
            near: null
        }, 
        {
            brgy: "Ibong Sapa (San Vicente sur)",
            municipal: "Virac",
            coordinates: [13.590827, 124.244163],
            near: {
                coordinates: [13.592712, 124.248632],
                name: "Ibong Sapa Multi-Purpose Hall"
            }
        }, 
        {
            brgy: "San Vicente",
            municipal: "Virac",
            coordinates: [13.593781, 124.258518],
            near: null
        }, 
        {
            brgy: "Marinawa",
            municipal: "Virac",
            coordinates: [13.596396, 124.268630],
            near: null
        }, 
        {
            brgy: "Catagbacan",
            municipal: "San Andres",
            coordinates: [13.618299, 124.066546],
            near: null
        }, 
        {
            brgy: "Bagong Sirang",
            municipal: "San Andres",
            coordinates: [13.624634, 124.056240],
            near: {
                coordinates: [13.624634, 124.056240],
                name: "Bagong Sirang Elementary School"
            }
        }, 
        {
            brgy: "Cabcab",
            municipal: "San Andres",
            coordinates: [13.629931, 124.049749],
            near: null
        }, 
        {
            brgy: "Bislig",
            municipal: "San Andres",
            coordinates: [13.648109, 124.040839],
            near: null
        }, 
        {
            brgy: "Bislig",
            municipal: "San Andres",
            coordinates: [13.639399, 124.041486],
            near: null
        }, 
        {
            brgy: "Bislig",
            municipal: "San Andres",
            coordinates: [13.644892, 124.041497],
            near: null
        }, 
        {
            brgy: "Codon",
            municipal: "San Andres",
            coordinates: [13.658695, 124.038991],
            near: null
        }, 
        {
            brgy: "Codon",
            municipal: "San Andres",
            coordinates: [13.658695, 124.038991],
            near: {
                coordinates: [13.664394, 124.041130],
                name: "Codon National Highschool"
            }
        }, 
        {
            brgy: "Mayngaway",
            municipal: "San Andres",
            coordinates: [13.680071, 124.053520],
            near: null
        }, 
        {
            brgy: "Puting Baybay",
            municipal: "San Andres",
            coordinates: [13.694179, 124.070735],
            near: null
        }, 
        {
            brgy: "Puting Baybay",
            municipal: "San Andres",
            coordinates: [13.694991, 124.075971],
            near: null
        }, 
        {
            brgy: "Tibang",
            municipal: "San Andres",
            coordinates: [13.699044, 124.088343],
            near: null
        }, 
        {
            brgy: "Barihay",
            municipal: "San Andres",
            coordinates: [13.707645, 124.099499],
            near: {
                coordinates: [13.707318, 124.098155],
                name: "Barihay Plaza"
            }
        }, 
        {
            brgy: "Hilawan",
            municipal: "San Andres",
            coordinates: [13.720168, 124.101381],
            near: null
        }, 
        {
            brgy: "Hilawan",
            municipal: "San Andres",
            coordinates: [13.725767, 124.105925],
            near: null
        }, 
        {
            brgy: "Manambrag",
            municipal: "San Andres",
            coordinates: [13.734014, 124.109235],
            near: null
        }, 
        {
            brgy: "Lubas",
            municipal:"San Andres",
            coordinates: [13.761403, 124.126326],
            near: null
        }, 
        {
            brgy: "Cabungahan",
            municipal: "San Andres",
            coordinates: [13.745181, 124.118999],
            near: null
        }, 
        {
            brgy: "Milaviga",
            municipal: "Caramoran",
            coordinates: [13.838186, 124.134229],
            near: {
                coordinates: [13.840623, 124.135157],
                name: "Minabobo Creek Resort"
            }
        }, 
        {
            brgy: "Hitoma",
            municipal: "Caramoran",
            coordinates: [13.784106, 124.138214],
            near: {
                coordinates: [13.778936, 124.138660],
                name: "Caramoran School of Fisheries"
            }
        }, 
        {
            brgy: "Inalmasinan",
            municipal: "Caramoran",
            coordinates: [13.797676, 124.136830],
            near: null
        }, 
        {
            brgy: "Guiamlong",
            municipal: "Caramoran",
            coordinates: [13.816772, 124.134137],
            near: null
        }, 
        {
            brgy: "Supang",
            municipal: "Caramoran",
            coordinates: [13.878040, 124.136504],
            near: {
                coordinates: [13.880262, 124.136537],
                name: "Supang Datag National Highscool"
            }
        }, 
        {
            brgy: "Datag West",
            municipal: "Caramoran",
            coordinates: [13.879090, 124.144084],
            near: null
        }, 
        {
            brgy: "Sabloyon",
            municipal: "Caramoran",
            coordinates: [13.888606, 124.158273],
            near: null
        }, 
        {
            brgy: "Datag East",
            municipal: "Caramoran",
            coordinates: [13.883053, 124.163785],
            near: null
        }, 
        {
            brgy: "Datag East",
            municipal: "Caramoran",
            coordinates: [13.893421, 124.182208],
            near: null
        }, 
        {
            brgy: "Cabuyuan",
            municipal: "Panganiban",
            coordinates: [13.888421, 124.201175],
            near: null
        }, 
        {
            brgy: "Cabuyuan",
            municipal: "Panganiban",
            coordinates: [13.885268, 124.264785],
            near: null
        }, 
        {
            brgy: "San Miguel",
            municipal: "Panganiban",
            coordinates: [13.895554, 124.273317],
            near: null
        }, 
        {
            brgy: "Mabini",
            municipal: "Panganiban",
            coordinates: [13.900755, 124.284371],
            near: null
        }, 
        {
            brgy: "Santa Maria",
            municipal: "Panganiban",
            coordinates: [13.909147, 124.295388],
            near: null
        }, 

        //End of panganiban


        //Start again sa Caramoran Papuntang Pandan
        {
            brgy: "Panique",
            municipal: "Caramoran",
            coordinates: [13.900065, 124.163095],
            near: null
        }, 
        {
            brgy: "Mabini",
            municipal: "Caramoran",
            coordinates: [13.906173, 124.164378],
            near: null
        }, 
        {
            brgy: "Mabini",
            municipal: "Caramoran",
            coordinates: [13.919200, 124.158249],
            near: null
        }, 
        {
            brgy: "Tubli",
            municipal: "Caramoran",
            coordinates: [13.932648, 124.147779],
            near: null
        }, 
        {
            brgy: "Tubli",
            municipal: "Caramoran",
            coordinates: [13.947321, 124.142460],
            near: null
        }, 
        {
            brgy: "Dariao",
            municipal: "Caramoran",
            coordinates: [13.960532, 124.140253],
            near: null
        }, 
        {
            brgy: "Bothoan Poblacion",
            municipal: "Caramoran",
            coordinates: [13.985305, 124.134071],
            near: null
        }, 
        {
            brgy: 'Conepction st.',
            coordinates: [13.592768,124.249529],
            municipal: 'Virac',
            near: null
        },
        {
            brgy: 'Virac Port',
            coordinates: [13.581917,124.233714],
            municipal: 'Virac',
            near: null
            
        },
        {
            brgy: 'Piñafrancia',
            coordinates: [13.587059,124.239709],
            municipal: 'Virac',
            near: null
            
        },
        {
            brgy: 'Ibong Sapa',
            coordinates: [13.592768,124.249529],
            municipal: 'Virac',
            near: null
        },
        {
            brgy: 'San Vicente',
            coordinates: [13.593716,124.251981],
            municipal: 'Virac',
            near: null
            
        },
        // {
        //     brgy:'Marinawa',
        //     municipal: 'Bato',
        //     near: {
        //         coordinates: [13.5978468, 124.2664677],
        //         name: 'Marinawa DDP '
        //     }
        // },
        {
            brgy: 'Cabugao',
            coordinates: [13.5972547, 124.2841757],
            municipal: 'Bato',
            near: {
                coordinates: [13.5978468, 124.2664677],
                name: 'Marinawa DDP '
            }
        },
        {
            brgy: 'Ginubatan',
            coordinates: [13.5972547, 124.2841757],
            municipal: 'Bato',
            near: null
        },
        {
            brgy: 'Sipi',
            coordinates: [13.5972547, 124.2841757],
            municipal: 'Bato',
            near: {
                coordinates: [13.611390,124.294343],
                name: 'PowerZone Gas'
            }
        },
        {
            brgy: 'Ginubatan',
            coordinates: [13.5972547, 124.2841757],
            municipal: 'Bato',
            near: null
            
        },
        {
            brgy: 'Oguis',
            coordinates: [13.5972547, 124.2841757],
            municipal: 'Bato',
            near: {
                coordinates: [13.624228,124.296361],
                name: 'NAPOCOR Balongbong Mini-Hydro Power Plant'
            }
        },
    {
    // SAN MIGUEL 
    brgy: 'Sibacungan',
        coordinates: [13.5972547, 124.2841757],
        municipal: 'San Miguel',
        near: {
            coordinates: [13.6310036, 124.3001335],
            name: 'Sibacungan Elementary School'
        }
        },
    {
    brgy: 'Sta. Elena',
        coordinates: [13.5972547, 124.2841757],
        municipal: 'San Miguel',
        near: {
            coordinates: [13.640868,124.304164],
            name: 'San Miguel Proper'
        }
        },
    {
    brgy: 'Boton',
        coordinates: [13.648168,124.304382],
        municipal: 'San Miguel',
        near: null
        
    },
    {
    brgy: 'Katipunan',
        coordinates: [13.660832,124.309696],
        municipal: 'San Miguel',
        near: null
        
    },
    {
        brgy: 'Boton',
        coordinates: [13.648168,124.304382],
        municipal: 'San Miguel',
        near: null
        
    },
    {
    brgy: 'Pangilao',
        coordinates: [13.671758,124.307861],
        municipal: 'San Miguel',
        near: {
            coordinates: [13.669541,124.308971],
            name: 'Pangilao Elementary School'
        }
        },
    {
    brgy: 'Buhi',
        coordinates: [13.675335,124.308708],
        municipal: 'San Miguel',
        near: null
        
    },
    {
    brgy: 'Mabato',
        coordinates: [13.6925238, 124.2980055],
        municipal: 'San Miguel',
        near: {
            coordinates: [13.690860,124.298559],
            name: 'Iglesia Ni Cristo - Lokal ng Mabato'
        }
    },
    {
    brgy: 'Kili-Kilihan',
        coordinates: [13.703388,124.281874],
        municipal: 'San Miguel',
        near: {
            coordinates: [13.705958,124.280649],
            name: 'San Miguel River Park and Resort'
        }
    },
    {
    brgy: 'Pagsanghan',
        coordinates: [13.724829,124.270698],
        municipal: 'San Miguel',
        near: {
            coordinates: [13.723844,124.271258],
            name: 'Pagsangahan Elementary School'
        }
    },
    {
    brgy: 'Paraiso',
        coordinates: [13.743218,124.271409],
        municipal: 'San Miguel',
        near: null
        
    },
    {
    brgy: 'Progreso',
        coordinates: [13.762740,124.271367],
        municipal: 'San Miguel',
        near: null
        
    },
    {
    brgy: 'Alma',
        coordinates: [13.768280,124.270345],
        municipal: 'San Miguel',
        near: null
        
    },
    {
    //VIGA
    brgy: 'P.vera(Summit)',
        coordinates: [13.790212,124.270208],
        municipal: 'Viga',
        near: {
            coordinates: [13.790554,124.269848],
            name: 'Summit View Park'
        }
    },
    {
    brgy: 'P.vera(Kanlangka)',
        coordinates: [13.811125,124.263990],
        municipal: 'Viga',
        near: null
        
    },
    {
    brgy: 'Sagrada',
        coordinates: [13.844533,124.280574],
        municipal: 'Viga',
        near: {
            coordinates: [13.842056,124.278994],
            name: 'Sagrada Elementary school'
        }
    },
    {
    brgy: 'Roxas',
        coordinates: [13.847575,124.284066],
        municipal: 'Viga',
        near: {
            coordinates: [13.849789,124.284587],
            name: 'Brgy. Roxas Public Plaza'
        }
    },
    {
    brgy: 'San Jose Oco',
        coordinates: [13.855026,124.286468],
        municipal: 'Viga',
        near: {
            coordinates: [13.853919,124.286378],
            name: 'St. Joseph the Worker Parish Church'
        }
    },
    {
    brgy: 'Del Pilar',
        coordinates: [13.859297,124.292430],
        municipal: 'Viga',
        near: null
        
    },
    {
    brgy: 'Viga Proper',
        coordinates: [13.870339,124.308995],
        municipal: 'Viga',
        near: {
            coordinates: [13.871250,124.309100],
            name: 'Viga Municipal Hall'
        }
    },
    {
    brgy: 'Piñafrancia',
        coordinates: [13.879798,124.311012],
        municipal: 'Viga',
        near: null
        
    },
    {
    brgy: 'Sta. Ana(Pob)',
        coordinates: [13.903416,124.305834],
        municipal: 'Panganiban',
        near:  {
            coordinates: [13.871250,124.309100],
            name: 'Catsu - Panganiban'
        }
        },
    {
    brgy: 'Panganiban Proper',
        coordinates: [13.907775,124.300688],
        municipal: 'Panganiban',
        near:  {
            coordinates: [13.908051,124.300634],
            name: 'Panganiban Town Plaza'
        }
    },
    {
    brgy: 'Sta. Maria',
        coordinates: [13.907075,124.296116],
        municipal: 'Panganiban',
        near:  {
            coordinates: [13.907244,124.295609],
            name: 'Angeles Homestay'
        }
    },
    {
    brgy: 'Bagong Bayan',
        coordinates: [13.912916,124.291227],
        municipal: 'Panganiban',
        near: null
        
    },
    {
        brgy: ' Taopon',
        coordinates: [13.927276,124.289020],
        municipal: 'Bagamanoc',
        near: null
        
    },
    {
    brgy: 'Bagamanoc Proper',
        coordinates: [13.941103,124.286946],
        municipal: 'Bagamanoc',
        near:  {
            coordinates: [13.940774,124.288825],
            name: 'Bagamanoc Plaza'
        }
    // BATO 
    },
    {
    brgy: 'Bato Proper',
        coordinates: [13.941103,124.286946],
        municipal: 'Bato',
        near:  {
            coordinates: [13.609084,124.297245],
            name: 'Bato Municipal Hall'
        }
    },
    {
    brgy: 'Bato Proper',
        coordinates: [13.941103,124.286946],
        municipal: 'Bato',
        near:  {
            coordinates: [13.607327,124.299663],
            name: 'Bato Central Elementary School'
        }
    },
    {
    brgy: 'Bato Proper',
        coordinates: [13.941103,124.286946],
        municipal: 'Bato',
        near:  {
            coordinates: [13.608101,124.303098],
            name: 'Bato Maternity and Childrens Hospital'
        }
    },
    {
    brgy: 'Bato Proper',
        coordinates: [13.941103,124.286946],
        municipal: 'Bato',
        near:  {
            coordinates: [13.608101,124.303098],
            name: 'Bato Maternity and Childrens Hospital'
        }
    },
    {
    brgy: 'Mintay',
        coordinates: [13.609414,124.307590],
        municipal: 'Bato',
        near:  null
        
    },
    {
        brgy: 'Bagumbayan',
        coordinates: [13.616069,124.318604],
        municipal: 'Bato',
        near:  null
        
    },
    {
    brgy: 'Buenavista',
        coordinates: [13.623994,124.332403],
        municipal: 'Bato',
        near:  {
            coordinates: [13.624458,124.332339],
            name: 'Buenavista Elementary School'
        }
    },
    {
    brgy: 'Salvacion',
        coordinates: [13.641508,124.342026],
        municipal: 'Bato',
        near:  null
        
    },
    {
    //BARAS
    brgy: 'Buenavista',
        coordinates: [13.623994,124.332403],
        municipal: 'Baras',
        near:  null
        
    },
    {
    brgy: 'Tilod',
        coordinates: [13.649636,124.347911],
        municipal: 'Baras',
        near:  null
        
    },
    {
    brgy: 'Osmeña',
        coordinates: [13.659519,124.361449],
        municipal: 'Baras',
        near:  null
        
    },
    {
    brgy: 'Quezon',
        coordinates: [13.662522,124.364255],
        municipal: 'Baras',
        near:  null
        
    },
    {
    brgy: 'Baras proper',
        coordinates: [13.660780,124.370252],
        municipal: 'Baras',
        near:  {
            coordinates: [13.661346,124.366666],
            name: 'Baras Rural Development High School'
        }
    },
    {
    brgy: 'Paniquihan',
        coordinates: [13.672824,124.381946],
        municipal: 'Baras',
        near:  null
        
    },
    {
    brgy: 'Puraran',
        coordinates: [13.688401,124.392518],
        municipal: 'Baras',
        near:  {
            coordinates: [13.689133,124.392559],
            name: 'Puraran Beach Arch'
        }
    },
    {
    brgy: 'Beticayan',
        coordinates: [13.698975,124.389449],
        municipal: 'Baras',
        near:  null
        
    },
    {
    brgy: 'Agban',
        coordinates: [13.713372,124.383733],
        municipal: 'Baras',
        near:  null
        
    },
    {
    brgy: 'Ginitligan',
        coordinates: [13.728822,124.387425],
        municipal: 'Baras',
        near:  null
        
    },
    {
    brgy: 'Dororian',
        coordinates: [13.750723,124.389978],
        municipal: 'Gigmoto',
        near: null
        
    },
    {
    brgy: 'Biong',
        coordinates: [13.764335,124.395881],
        municipal: 'Gigmoto',
        near: null
        
    },
    {
        brgy: 'Gigimoto Proper',
        coordinates: [13.780616,124.391533],
        municipal: 'Gigmoto',
        near: {
            coordinates: [13.772901,124.392808],
            name: 'Gigmoto Rural Development High School'
        }
    }
]

    const [ points, setPoints ] = useState(areas)
    const [ municipals, setMunicipals ] = useState(['Virac', 'San Andres', 'Bato', 'Caramoran', 'Pandan', 'Gigmoto', 'Viga'])
    return (
        <MapDetailsContext.Provider value={{ points, municipals }}>
            { children }
        </MapDetailsContext.Provider>
    )
}

export const useMapDetails = () => useContext(MapDetailsContext);

