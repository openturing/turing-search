package com.viglet.turing.onstartup;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.ApplicationArguments;
import org.springframework.boot.ApplicationRunner;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;

import com.viglet.turing.onstartup.nlp.TurNLPEntityOnStartup;
import com.viglet.turing.onstartup.nlp.TurNLPFeatureOnStartup;
import com.viglet.turing.onstartup.nlp.TurNLPInstanceOnStartup;
import com.viglet.turing.onstartup.nlp.TurNLPVendorEntityOnStartup;
import com.viglet.turing.onstartup.nlp.TurNLPVendorOnStartup;
import com.viglet.turing.onstartup.se.TurSEInstanceOnStartup;
import com.viglet.turing.onstartup.se.TurSEVendorOnStartup;
import com.viglet.turing.onstartup.sn.TurSNSiteOnStartup;
import com.viglet.turing.onstartup.system.TurConfigVarOnStartup;
import com.viglet.turing.onstartup.system.TurLocaleOnStartup;
import com.viglet.turing.persistence.repository.system.TurConfigVarRepository;

@Component
@Transactional
public class TurOnStartup implements ApplicationRunner {

	@Autowired
	private TurConfigVarRepository turConfigVarRepository;

	@Autowired
	private TurLocaleOnStartup turLocaleOnStartup;
	@Autowired
	private TurNLPVendorOnStartup turNLPVendorOnStartup;
	@Autowired
	private TurNLPEntityOnStartup turNLPEntityOnStartup;
	@Autowired
	private TurNLPVendorEntityOnStartup turNLPVendorEntityOnStartup;
	@Autowired
	private TurNLPFeatureOnStartup turNLPFeatureOnStartup;
	@Autowired
	private TurNLPInstanceOnStartup turNLPInstanceOnStartup;
	@Autowired
	private TurSEVendorOnStartup turSEVendorOnStartup;
	@Autowired
	private TurSEInstanceOnStartup turSEInstanceOnStartup;
	@Autowired
	private TurConfigVarOnStartup turConfigVarOnStartup;
	@Autowired
	private TurSNSiteOnStartup turSNSiteOnStartup;
	
	@Override
	public void run(ApplicationArguments arg0) throws Exception {
		final String FIRST_TIME = "FIRST_TIME";

		if (!turConfigVarRepository.findById(FIRST_TIME).isPresent()) {
			
			System.out.println("First Time Configuration ...");

			turLocaleOnStartup.createDefaultRows();
			turNLPVendorOnStartup.createDefaultRows();
			turNLPEntityOnStartup.createDefaultRows();
			turNLPVendorEntityOnStartup.createDefaultRows();
			turNLPFeatureOnStartup.createDefaultRows();
			turNLPInstanceOnStartup.createDefaultRows();
			turSEVendorOnStartup.createDefaultRows();
			turSEInstanceOnStartup.createDefaultRows();
			turSNSiteOnStartup.createDefaultRows();
			turConfigVarOnStartup.createDefaultRows();

			System.out.println("Configuration finished.");
		}

	}

}